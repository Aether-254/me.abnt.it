---
title: 评 PCL CE，21世纪最贴心为你准备后路的启动器
date: 2026-11-27
summary: 由于本文包含大量对启动器的评价，可能引起部分粉丝不适，请谨慎阅读。
draft: false
---
> 本文章已发布到 [me.abnt.it](http://me.abnt.it/blog/pichailangqidongqishequbanweishenmeshiyituoshi) 并以 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en) 授权。

很显然我不知道是哪个受到[生成式预训练转换器](https://chatgpt.com/)感召的法务部编写了这个社区版，还是它的维护者为了证明自己和原版[劈柴狼](https://github.com/Meloong-Git/PCL)存在某种生殖隔离，总之在打开这个东西的 1 [普朗克时间](https://zh.wikipedia.org/zh-hans/%E6%99%AE%E6%9C%97%E5%85%8B%E6%99%82%E9%96%93)内笔者就已经明白了什么叫行为艺术。

笔者建议[劈柴狼社区版](https://github.com/PCL-Community/PCL2-CE)的维护者立刻把精力从起草红头文件转移到修一下基本的交互逻辑上，唯一让我感到欣慰并且设计得极其符合人类直觉的功能是它自带了一个一键跑路按钮。

![image.png](/uploads/image-13.png)

为了防止各位读者的[虹膜](https://irisshaders.dev/)在后续体验中遭遇不可逆损伤，建议直接按下截图中的红色按钮，笔者不对您坚持使用该启动器导致的任何[并发](https://en.wikipedia.org/wiki/Concurrent_computing)症负责。

### 1/ 未观测到的异步任务异常

虽然这个[软件](https://zh.wikipedia.org/zh-hans/%E8%BD%AF%E4%BB%B6)继承了[原版劈柴狼](https://github.com/Meloong-Git/PCL)的皮囊，但是实际上在核心的 [Mod](https://en.wikipedia.org/wiki/Video_game_modding) 管理体验上不仅在一些（看起来没什么用的）[生活质量提升](https://en.wikipedia.org/wiki/Quality_of_life)设计的增加的同时还加入了更多极其反人类的阻塞逻辑。

当笔者满怀期待地打开 Mod 列表准备正常配置环境时，这款发射台直接给笔者端上来一个**未观测到的异步任务异常**。

![image.png](/uploads/image-14.png)

这还不是最致命的，最令人[蒙古](https://zh.wikipedia.org/zh-hans/%E8%92%99%E5%8F%A4%E5%9B%BD)的是这个异常还附带了一个天荒地老的超高 timeout。在超时之前（你甚至不知道什么时候超时，因为这看起来是一个网络问题，也许他们正在尝试请求[模组元数据](https://docs.modrinth.com/api/operations/getproject/)但是他们失败了），你无法在 Mod 列表中进行任何操作，唯一被赋予的交互权限就是干瞪着屏幕欣赏这个异常弹窗，否则你会得到更多未观测到的异步任务异常，或者你也可以考虑直接退出去。

显然作者并没有去[微软学习](https://learn.microsoft.com/)学习[任务异常处理](https://learn.microsoft.com/zh-cn/dotnet/standard/asynchronous-programming-patterns/task-exception-handling)，既然 Task 抛了异常没人 `await` 也没人 `catch` 那就干脆让整个前端陪葬去了。

不知道的还以为玩的不是[《我的手艺》](https://minecraft.net/)而是在参与某种木头人挑战。  

### 2/ 钦定 JDK 与祖传默认参数

在自动选择 Java 环境的逻辑上 PCL CE 展现出了堪比一只成年[香蕉](https://zh.wikipedia.org/zh-hans/%E9%A6%99%E8%95%89)的判断力。

明明电脑里躺着现成的 [JDK](https://en.wikipedia.org/wiki/Java_Development_Kit) 21 甚至 JDK 25，面前的版本是《我的手艺》1.20.1，结果它的自动选择逻辑经过一番惊天地泣鬼神的精密运算后毅然决然地无视了高版本 JDK，非要给你钦定一个 JDK 17。

与此同时，在 JVM 启动参数上依然把祖传的 G1GC 和 默认`-Xms`/`-Xmn`焊死在配置里。

![image.png](/uploads/image-15.png)

高版本 Java 的[现代垃圾回收器](https://wiki.openjdk.org/spaces/zgc/pages/34668579/Main)摆在那里当摆设还贴心地用默认参数帮你重温经典卡顿手感。  

### 3/ UI

更逆天的是它的本地化工程与前端布局。

- i18n 失败：切完语言之后，界面里中英混杂，局部回退。  
![image.png](/uploads/image-16.png)

  
- 文字重叠与裁切：不同语言文本长度差异加上完全没有做自适应布局直接引发各种时空坍缩。Mod 列表顶部 `Updatable (87)` 的数字直接和旁边的上下排序箭头 `↑↓` 撞车叠在一起；到了 `About` 页，最右侧 `Natayark Open...` 按钮直接被裁掉半截。  

  ![image.png](/uploads/image-19.png)
  ![image.png](/uploads/image-17.png)

  
- 无限加载动画：不管你是看整合包属性页里的 `Loading information...` 还是在资源下载页看 `Getting version list...`，动不动就给你卡在一把蓝色小镐头底下干等，仿佛后台线程去西天取经了。  

  ![image.png](/uploads/image-21.png)
  ![image.png](/uploads/image-20.png)

  
- [让](https://en.wiktionary.org/wiki/let)[PCL CE](https://github.com/PCL-community/PCL-CE)[变得](https://en.wiktionary.org/wiki/go)[被国际化的](https://en.wiktionary.org/wiki/internationalised)。谁家 Chinglish。

  ![image.png](/uploads/image-22.png)

### 4/ 升华

如果说前面的 bug 只是技术水平有限，那当你点开仓库里的 `CONTRIBUTING.md`，点进[《生成式人工智能使用方针》](https://docs.pclc.cc/ce/developers/ai-policy)，再看一下仓库贡献榜时，卡夫卡看了都得连夜把《城堡》删了重写。

![image.png](/uploads/image-28.png)

![image.png](/uploads/image-25.png)

![image.png](/uploads/image-29.png)

虽然笔者的一贯作风是不以项目是否使用大模型来攻击，但用 [GPT](https://chatgpt.com) 去写一份防守别人滥用 AI 提交低质代码的合规法典，转头自己贡献榜上还挂着 Copilot 和 claude。无法形容。

刚打开这个《方针》我就[蒙古](https://zh.wikipedia.org/zh-hans/%E8%92%99%E5%8F%A4%E5%9B%BD)了，[RFC 2119](https://www.rfc-editor.org/rfc/rfc2119.html) 吗？上来先一张《规范用语说明》表格把 `必须 / 不得`、`应 / 不应`、`建议 / 推荐`、`可以` 像国际电信联盟标准一样逐条定义。？

`本文件规定...` `包括 A、B、C、D 以及 E 等内容不能代替...也不能代替...` `使用 AI 不构成拒绝贡献的唯一理由，但也不能作为降低质量要求或免除贡献者责任的依据`，每一行都在散发着 [GPT](https://openai.com/index/gpt-6-astra/) 味。

还有方针里写得义正辞严强调 AI 不能代替贡献者完成必要的理解、审查和验证工作；
结果贡献者列表里出现了 Copilot 和 claude，甚至 Issues 里面一大堆 `[AI Review]` 。
  
![image.png](/uploads/image-30.png)

### 结语

好在劈柴狼社区版的[开发者（们）](https://chatgpt.com)显然对自己的[软件质量](https://zh.wikipedia.org/zh-cn/%E8%BD%AF%E4%BB%B6%E8%B4%A8%E9%87%8F)有着极其清醒的认知，他们知道普通用户在面对一堆报错时可能会找不到卸载入口，于是大发慈悲地在 `Settings -> Miscellaneous` 最显眼的位置，用最醒目的红色按钮放了一个全软件交互最流畅逻辑最闭环零异常零超时的功能——`Stop using PCL CE`。

甚至在点击之后还会弹出一个同样通红的确认框，贴心地问你一句：`Are you sure you want to continue?`

![image.png](/uploads/image-33.png)

必须继续，一刻都不能多等。

---

## 二编

![image.png](/uploads/image-31.png)

Export modpack:CBC 0.7.0 FSuccess!

你甚至不愿意给它一个空格。

# Pages CMS 太他妈难用了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

我将转而使用[微软大战代码](https://code.visualstudio.com/)来编辑我的博客。

![image.png](/uploads/image-34.png)

