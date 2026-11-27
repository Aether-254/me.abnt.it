---
title: 评 PCL CE，21世纪最贴心为你准备后路的启动器
date: 2026-11-27
summary: 由于本文包含大量对启动器的评价，可能引起部分粉丝不适，请谨慎阅读。
draft: false
---
> 本文章已发布到 [me.abnt.it](http://me.abnt.it/blog/pichailangqidongqishequbanweishenmeshiyituoshi) 并以 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en) 授权。

很显然我不知道是哪个受到[生成式预训练转换器](https://chatgpt.com/)感召的赛博法务部编写了这个社区版，还是它的维护者为了证明自己和原版[劈柴狼](https://github.com/Meloong-Git/PCL)存在某种生殖隔离，总之在打开这个东西的 1 [普朗克时间](https://zh.wikipedia.org/zh-hans/%E6%99%AE%E6%9C%97%E5%85%8B%E6%99%82%E9%96%93)内，笔者就已经明白了什么叫代码在裸奔。

笔者建议[劈柴狼社区版](https://github.com/PCL-Community/PCL2-CE)的维护者立刻把精力从起草红头文件转移到修一下基本的交互逻辑上。唯一让我感到欣慰并且设计得极其符合人类直觉的功能是它自带了一个一键跑路按钮。

![image.png](/uploads/image-13.png)

> 本文章最优美的图片。为了防止各位读者的[虹膜](https://irisshaders.dev/)在后续体验中遭遇不可逆损伤，建议直接按下截图中的红色按钮，笔者不对您坚持使用该启动器导致的任何血压飙升负责。

### 一、 未观测到的异步任务异常

虽然这个[软件](https://zh.wikipedia.org/zh-hans/%E8%BD%AF%E4%BB%B6)继承了[原版劈柴狼](https://github.com/Meloong-Git/PCL)的皮囊，但是实际上在核心的 [Mod](https://en.wikipedia.org/wiki/Video_game_modding) 管理体验上在一些（看起来没什么用的）[生活质量提升](https://en.wikipedia.org/wiki/Quality_of_life)设计的增加的同时还加入了更多极其反人类的阻塞逻辑。

当笔者满怀期待地打开 Mod 列表准备正常配置环境时，启动器直接给笔者端上来一个**未观测到的异步任务异常**。

![image.png](/uploads/image-14.png)

这还不是最致命的。最令人[蒙古](https://zh.wikipedia.org/zh-hans/%E8%92%99%E5%8F%A4%E5%9B%BD)的是这个异常还附带了一个堪称天荒地老的超高 Timeout。在漫长的 Timeout 倒计时走完之前（你甚至不知道什么时候走完），**你无法在 Mod 列表中进行任何操作**。不能点，不能取消，唯一被赋予的交互权限就是干瞪着屏幕欣赏这个异常弹窗，否则你会得到更多**未观测到的异步任务异常**，或者你也可以考虑直接退出去。

很显然，作者贯彻了某种极繁主义异步哲学，并且他们并没有去[微软学习](https://learn.microsoft.com/)学习[任务异常处理](https://learn.microsoft.com/zh-cn/dotnet/standard/asynchronous-programming-patterns/task-exception-handling)：既然 Task 抛了异常没人 `await` 也没人 `catch`，那就干脆把整个前端交互锁死陪葬。不知道的还以为玩的不是 [《我的手艺》](https://minecraft.net/) 而是在参与某种赛博禅修木头人挑战。  

### 二、 钦定 JDK 与祖传默认参数

在自动选择 Java 环境的逻辑上，PCL CE 展现出了堪比一只成年[香蕉](https://zh.wikipedia.org/zh-hans/%E9%A6%99%E8%95%89)的判断力。

明明电脑里躺着现成的 [JDK](https://en.wikipedia.org/wiki/Java_Development_Kit) 21 甚至 JDK 25，面前的版本是 《我的手艺》 1.20.1，结果它的自动选择逻辑经过一番惊天地泣鬼神的精密运算后，毅然决然地无视了高版本 JDK，非要给你钦定一个 **JDK 17**。

与此同时，在 JVM 启动参数上依然把祖传的 **默认 G1GC** 和 **默认** `-Xms` **/** `-Xmn` 焊死在配置里。

![image.png](/uploads/image-15.png)

高版本 Java 的现代垃圾回收器摆在那里当摆设，它不仅帮你把新版本 JDK 过滤得干干净净，还要贴心地用老掉牙的默认参数帮你重温经典卡顿手感。  

### 三、 UI 行为艺术

更逆天的是它的本地化（i18n）工程与前端布局。一个连基础界面文本都渲染不明白的启动器，硬是要在国际化上整出一种后现代抽象艺术：

- **i18n 失败**：切完语言之后，界面里中英混杂、局部回退甚至露馅，主打一个赛博双语混合双打。
![image.png](/uploads/image-16.png)
- **文字重叠与裁切**：不同语言文本长度差异加上完全没有做自适应布局，直接引发各种时空坍缩。Mod 列表顶部 `Updatable (87)` 的数字直接和旁边的上下排序箭头 `↑↓` 撞车叠在一起；到了 `About` 页，最右侧 `Natayark Open...` 按钮直接被容器/红框裁掉半截字，顶栏甚至还横亘着一条莫名其妙的细线。
![image.png](/uploads/image-19.png)
![image.png](/uploads/image-17.png)
- **无限镐头加载动画**：不管你是看整合包属性页里的 `Loading information...`，还是在资源下载页看 `Getting version list...`，动不动就给你卡在一把蓝色小镐头底下干等，仿佛后台线程已经去西天取经了。
![image.png](/uploads/image-21.png)
![image.png](/uploads/image-20.png)

让人不禁怀疑，让劈柴狼测去国际化的那群人是不是原封不动地跑来给 PCL CE 做 UI 验收了（`let 劈柴狼 测 Go internationalization failed.`

![image.png](/uploads/image-22.png)

> 注意。此画面为实拍。如果您在审阅上述重叠文字和半截按钮时遭遇了视觉不适，请及时闭眼休息 5 分钟。

### 四、 灵魂升华

如果说前面的 bug 只是技术水平有限，那当你点开仓库里的 `CONTRIBUTING.md`，顺着里面的三个链接点进[《生成式人工智能使用方针》](https://docs.pclc.cc/ce/developers/ai-policy)，再顺手翻一眼仓库贡献榜时，整篇《方针》的荒诞程度直接完成了诺贝尔文学奖级别的升华。

![image.png](/uploads/image-28.png)

![image.png](/uploads/image-25.png)

![image.png](/uploads/image-29.png)

虽然笔者的一贯作风是不以项目是否使用大模型来攻击，但用**溢出屏幕的防御性**，去写一份严防死守别人滥用 AI 提交低质代码的合规法典，转头自己贡献榜上还挂着 Copilot 和 claude，这种自我指涉的幽默还是太超前了。

1. [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119.html) 级法条：一个社区维护的发射台文档，上来先给你摆一张《规范用语说明》表格，把 `必须 / 不得`、`应 / 不应`、`建议 / 推荐`、`可以` 像国际电信联盟标准一样逐条定义，甚至不忘精准补刀一句`除非另有说明，本文中的“贡献者”也包括以贡献者身份参与项目活动的维护者`，这甲叠得比下界合金套还厚。
2. 端水大师`本文件规定...包括 A、B、C、D 以及 E 等内容不能代替...也不能代替...使用 AI 不构成拒绝贡献的唯一理由，但也不能作为降低质量要求或免除贡献者责任的依据`，每一行都在散发着 [GPT](https://openai.com/index/gpt-6-astra/) 味。
3. 八章加附录：从一排到八外加附录，连“适用范围与定义”都单开第一章。
4. 当场打脸：方针里写得义正辞严，强调 AI 不能代替贡献者完成必要的理解、审查和验证工作；结果贡献者列表里出现了 Copilot 和 claude，甚至 Issues 里面一大堆 `[AI Review]` 。
  ![image.png](/uploads/image-30.png)

### 结语

好在 PCL CE 的开发者显然对自己的软件质量有着极其清醒的认知。他们知道普通用户打开设置面对一堆报错时可能会找不到卸载入口，于是大发慈悲地在 `Settings -> Miscellaneous` 最显眼的位置，用醒目的红色边框框出了全软件交互最流畅、逻辑最闭环、零异常零超时的神级功能：`Stop using PCL CE`。

甚至在点击之后还会弹出一个同样通红的确认框，贴心地问你一句：`Are you sure you want to continue?`

必须继续，一刻都不能多等。