---
title: 把 Minecraft mod 从 1.21.1 移植到 1.21.11 时踩过的坑
date: 2026-09-15
summary: 26.1.2 的 jar 不再混淆，但 Mixin 注解里的字符串只能靠字节码校验；可选依赖的引用位置决定了会不会在类加载阶段崩。
tags: [minecraft, java, mixin]
---

最近把一批 Create 附属和客户端 mod 从 NeoForge 1.21.1 挪到 Fabric 1.21.11，记录几个反复出现的问题。

## Mixin 目标签名

`@Inject(method = "...")` 里的字符串编译器不会检查。版本一换，方法描述符变了，运行时才报 `InvalidInjectionException`。解决办法是写一个 Gradle task，用 ASM 读目标 jar，把所有 Mixin 注解里的 method/target 字符串逐个对照真实的类文件校验。

```kotlin
tasks.register<JavaExec>("verifyMixins") {
    classpath = sourceSets["main"].runtimeClasspath
    mainClass.set("dev.aether.tools.MixinVerifier")
    args(mcJar.get().asFile.absolutePath, mixinsJson.get().asFile.absolutePath)
}
```

## 可选依赖崩在类加载

如果一个类在签名上 `implements` 了可选 mod 的接口，那个 mod 不在时这个类根本加载不出来，启动直接崩。放到方法体里引用则是惰性的，只有真正执行到才会去解析。

```java
// 会崩
public class VaultBlockEntity extends BlockEntity implements IHaveGoggleInformation { ... }

// 安全
public boolean addToGoggleTooltip(List<Component> tooltip, boolean sneaking) {
    if (!FabricLoader.getInstance().isModLoaded("create")) return false;
    return GoggleBridge.addTooltip(this, tooltip, sneaking);
}
```

## 版本数据一律运行时查

不要把 `Registries` 里的 ID、数据包路径写死在源码里，全部通过 loader API 在运行时取。这样同一份源码换目标版本时只改 `gradle.properties`。
