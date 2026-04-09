import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { Textarea } from "./components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

const DIMENSIONS = {
  insight: {
    name: "看清问题",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    desc: "面对复杂情况，能抓重点、理结构、看本质。",
    detail:
      "你往往不是急着开始，而是先把问题弄明白。你擅长在信息繁杂、目标模糊的情况下，抽出关键线索，帮助自己和他人更快找到方向。",
    scenes: ["复杂任务拆解", "复盘总结", "流程梳理", "需求澄清"],
    reminder: "有时会因为想得太完整，导致推进节奏偏慢。",
    actions: [
      "遇到复杂任务时，先用 3 句话写出关键问题与判断依据。",
      "在分析之后，给自己加一个'今天就开始的第一步'。",
    ],
    role: "问题澄清者",
    underrated: "你不只是会分析，也常常能帮团队减少试错和返工。",
  },
  execution: {
    name: "把事做成",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    desc: "能推进任务、盯住结果、把事情落地。",
    detail:
      "你天然更关注进展与结果。对你来说，事情真正开始，不是想清楚，而是已经往前走起来。你擅长把模糊目标变成明确动作，并持续推进直到交付。",
    scenes: ["项目推进", "节点管理", "运营执行", "SOP 落地"],
    reminder: "过度关注结果时，可能压缩共识建立与情绪照顾。",
    actions: [
      "推进前先明确'什么叫完成'，提升闭环质量。",
      "在关键节点多留 1 次对齐动作，让推进更稳。",
    ],
    role: "推进落地者",
    underrated: "你不只是执行快，很多时候你也是团队把目标变成现实的关键一环。",
  },
  collaboration: {
    name: "与人协同",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    desc: "能理解他人、建立信任、促进配合。",
    detail:
      "你对人和关系有天然敏感度，能更快感知别人真正的顾虑、节奏和期待。你常常是让合作更顺、让氛围更稳的关键人物。",
    scenes: ["跨团队协作", "关系协调", "内部客户对接", "支持与辅导"],
    reminder: "太顾及关系时，可能延迟表达真实意见或做出决断。",
    actions: [
      "协同时把'关系照顾'和'目标推进'同时说出来。",
      "遇到分歧时，先确认共识，再提出你的真实判断。",
    ],
    role: "协作连接者",
    underrated: "你不只是让人舒服，更是在帮助团队减少摩擦、提高配合效率。",
  },
  influence: {
    name: "带动他人",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    desc: "能表达观点、形成共识、激发行动。",
    detail:
      "你往往能在关键时刻把话说清楚，也更容易让别人理解你的方向与主张。你不是单纯会说，而是更容易推动别人一起往前。",
    scenes: ["方案汇报", "会议引导", "分享表达", "向上沟通"],
    reminder: "表达很强时，可能无意中压过他人声音或忽略细节。",
    actions: [
      "表达观点时，先说结论，再补充理由和行动建议。",
      "在带动别人前，多问一句：你现在最担心什么？",
    ],
    role: "方向带动者",
    underrated: "你不只是会表达，更可能在关键时刻帮助大家统一方向、减少犹豫。",
  },
  growth: {
    name: "快速成长",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    desc: "能持续学习、吸收新东西、边做边进化。",
    detail:
      "你对新工具、新方法、新经验的吸收速度较快，也愿意在变化中调整自己。你常常不是停在'会了'，而是会继续想：还能不能更好。",
    scenes: ["新业务适应", "工具方法迭代", "AI 应用", "个人成长"],
    reminder: "学习过多、切换过快时，容易影响聚焦和沉淀。",
    actions: [
      "每学到一个新方法，只要求自己先落地 1 次。",
      "复盘时记录'这次我具体升级了什么'，帮助成长沉淀。",
    ],
    role: "成长升级者",
    underrated: "你不只是适应变化，更可能是团队里较早看到新机会、尝试新方法的人。",
  },
  resilience: {
    name: "稳住节奏",
    color: "bg-slate-50 text-slate-700 border-slate-300",
    desc: "在压力和变化中，依然保持稳定、冷静和恢复力。",
    detail:
      "你不一定最抢眼，但常常是让事情不失速的人。面对压力、变化和不确定时，你更容易维持基本秩序，并逐步把自己和周围状态拉回正轨。",
    scenes: ["高压交付", "变更频发", "多线程工作", "长期任务推进"],
    reminder: "太能扛的时候，容易把压力默默留给自己。",
    actions: [
      "压力高时，先明确哪些事情必须做，哪些可以延后。",
      "保持稳定的同时，也练习主动求助与表达需要。",
    ],
    role: "稳定定盘者",
    underrated: "你不只是稳，更常常在关键阶段提供了团队最需要的安全感和持续性。",
  },
};

const QUESTIONS = [
  {
    id: 1,
    text: "接到一个新任务时，你通常最自然的第一步是？",
    options: [
      { text: "先把问题拆开，弄清楚重点和逻辑", dimension: "insight" },
      { text: "先想怎么安排步骤，尽快推进起来", dimension: "execution" },
      { text: "先确认相关的人是谁，了解彼此期待", dimension: "collaboration" },
      { text: "先想怎么把方向讲清楚，让大家愿意一起动", dimension: "influence" },
    ],
  },
  {
    id: 2,
    text: "面对一项陌生但重要的工作，你更容易怎么做？",
    options: [
      { text: "先搞懂背景和规律，避免一上来就做偏", dimension: "insight" },
      { text: "先定一个可执行的小目标，边做边推进", dimension: "execution" },
      { text: "主动去请教有经验的人，快速吸收有用经验", dimension: "growth" },
      { text: "先稳住自己，不被陌生和压力打乱节奏", dimension: "resilience" },
    ],
  },
  {
    id: 3,
    text: "当团队里出现分歧时，你更可能自然扮演什么角色？",
    options: [
      { text: "帮大家照顾彼此感受，让合作不要变僵", dimension: "collaboration" },
      { text: "把观点说清楚，推动大家形成方向", dimension: "influence" },
      { text: "从分歧里学到东西，帮助团队优化之后的做法", dimension: "growth" },
      { text: "在气氛紧张时保持稳定，不轻易乱", dimension: "resilience" },
    ],
  },
  {
    id: 4,
    text: "别人最常因为什么来找你帮忙？",
    options: [
      { text: "帮忙理清一个复杂问题", dimension: "insight" },
      { text: "帮忙把卡住的事继续往前推", dimension: "execution" },
      { text: "帮忙协调关系或促进合作", dimension: "collaboration" },
      { text: "帮忙把一个想法讲明白、讲有说服力", dimension: "influence" },
    ],
  },
  {
    id: 5,
    text: "当工作要求突然变化时，你更可能怎么反应？",
    options: [
      { text: "先重新判断，弄清楚变化背后的关键影响", dimension: "insight" },
      { text: "迅速调整计划，让事情继续往前走", dimension: "execution" },
      { text: "把这次变化当成一次学习和升级机会", dimension: "growth" },
      { text: "不慌乱，先稳住节奏再处理", dimension: "resilience" },
    ],
  },
  {
    id: 6,
    text: "在一个合作项目里，你最容易发挥价值的方式是？",
    options: [
      { text: "让大家愿意说出真实想法，合作更顺", dimension: "collaboration" },
      { text: "在关键时刻总结观点、带动方向", dimension: "influence" },
      { text: "把过程中的经验及时提炼出来，下次做得更好", dimension: "growth" },
      { text: "在压力和变化里保持稳定，让团队不容易失速", dimension: "resilience" },
    ],
  },
  {
    id: 7,
    text: "如果一个任务信息很多、很乱，你通常会？",
    options: [
      { text: "先把信息整理成更清楚的结构", dimension: "insight" },
      { text: "先抓最关键的一步，尽快开始做", dimension: "execution" },
      { text: "先找相关的人确认重点和边界", dimension: "collaboration" },
      { text: "先试着把复杂内容讲成大家都能懂的话", dimension: "influence" },
    ],
  },
  {
    id: 8,
    text: "当你进入状态时，通常更像下面哪种情况？",
    options: [
      { text: "越研究越明白，思路越来越清晰", dimension: "insight" },
      { text: "一件件推进，看着事情被完成很有成就感", dimension: "execution" },
      { text: "学到新方法、新工具，觉得自己在明显进步", dimension: "growth" },
      { text: "再忙也能保持基本稳定，不容易慌", dimension: "resilience" },
    ],
  },
  {
    id: 9,
    text: "当团队需要调整合作方式时，你更容易做什么？",
    options: [
      { text: "关注每个人的感受和配合体验", dimension: "collaboration" },
      { text: "帮团队把话说开，把共识建立起来", dimension: "influence" },
      { text: "复盘哪里还能优化，推动大家升级做法", dimension: "growth" },
      { text: "在变化中保持定力，让合作不至于失控", dimension: "resilience" },
    ],
  },
  {
    id: 10,
    text: "复盘一件事情时，你最自然会先看什么？",
    options: [
      { text: "哪里真正出了问题，根因是什么", dimension: "insight" },
      { text: "哪一步没做到位，下一次怎么更落地", dimension: "execution" },
      { text: "哪些配合点做得好、哪些地方还可以更顺", dimension: "collaboration" },
      { text: "哪些表达方式真正影响了大家的行动", dimension: "influence" },
    ],
  },
  {
    id: 11,
    text: "遇到新的工具、方法或工作要求时，你通常会？",
    options: [
      { text: "先搞懂它背后的原理和适用边界", dimension: "insight" },
      { text: "先拿来试，用起来再不断修正", dimension: "execution" },
      { text: "很快被激发兴趣，愿意吸收并更新自己", dimension: "growth" },
      { text: "即使变化很快，也能让自己保持基本节奏", dimension: "resilience" },
    ],
  },
  {
    id: 12,
    text: "如果别人评价你'这个人很可靠'，你觉得更可能是因为？",
    options: [
      { text: "你总能把复杂情况看得比较明白", dimension: "insight" },
      { text: "你能把事情一步步推到结果", dimension: "execution" },
      { text: "你让人相处起来舒服，也更愿意合作", dimension: "collaboration" },
      { text: "你在不顺利的时候还能稳得住", dimension: "resilience" },
    ],
  },
];

function getSortedResults(scores) {
  return Object.entries(scores)
    .map(([key, value]) => ({ key, value, ...DIMENSIONS[key] }))
    .sort((a, b) => b.value - a.value);
}

function getResultSummary(top1, top2) {
  if (!top1 || !top2) return "";
  if (top1.value === top2.value) {
    return `你当前展现出两项并列优势倾向：${top1.name} 与 ${top2.name}。`;
  }
  return `你当前最容易展现出的优势组合是：${top1.name} + ${top2.name}。`;
}

function getComboMessage(top1, top2) {
  if (!top1 || !top2) return "";
  if (top1.value === top2.value) {
    return `从这次作答看，你不是单一地靠一种方式做事，而是更容易在 ${top1.name} 和 ${top2.name} 之间切换。这样的组合，往往让你既有自己的发力点，也有更灵活的适应方式。`;
  }
  return `${top1.name} 让你更容易形成自己的主要发力方式，${top2.name} 则常常在关键时刻补足你、放大你。你给人的感受，往往不是单点突出，而是这两种优势一起发挥作用。`;
}

function getWorkStyleSuggestion(top1, top2) {
  if (!top1 || !top2) return "";
  return `对你来说，更合适的工作方式通常是：先用 ${top1.name} 找到你的主要切入点，再用 ${top2.name} 让推进、协作或升级更完整。与其逼自己样样平均，不如先把最自然的优势用深，再逐步补足第二优势。`;
}

function getValidationPrompts(top1, top2) {
  if (!top1 || !top2) return [];
  return [
    `回想最近 1 件你做得很顺的事：里面更明显体现的是 ${top1.name}，还是 ${top2.name}？`,
    `当别人认可你时，他们更常夸你"${top1.role}"这一面，还是你身上更安静但稳定的那一面？`,
    `下周你可以刻意多用一次 ${top1.name}，再观察 ${top2.name} 是否也会跟着被带出来。`,
  ];
}

export default function StrengthDiscoveryApp() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [reflection, setReflection] = useState("");

  const progress = useMemo(() => {
    if (step !== "quiz") return 0;
    return Math.round((current / QUESTIONS.length) * 100);
  }, [step, current]);

  const scores = useMemo(() => {
    const initial = {
      insight: 0,
      execution: 0,
      collaboration: 0,
      influence: 0,
      growth: 0,
      resilience: 0,
    };
    answers.forEach((dimension) => {
      initial[dimension] += 1;
    });
    return initial;
  }, [answers]);

  const results = useMemo(() => getSortedResults(scores), [scores]);
  const top1 = results[0];
  const top2 = results[1];
  const summary = useMemo(() => getResultSummary(top1, top2), [top1, top2]);
  const comboMessage = useMemo(() => getComboMessage(top1, top2), [top1, top2]);
  const workStyle = useMemo(() => getWorkStyleSuggestion(top1, top2), [top1, top2]);
  const validationPrompts = useMemo(() => getValidationPrompts(top1, top2), [top1, top2]);

  const handleAnswer = (dimension) => {
    const nextAnswers = [...answers, dimension];
    setAnswers(nextAnswers);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setStep("result");
    }
  };

  const handleRestart = () => {
    setStep("intro");
    setCurrent(0);
    setAnswers([]);
    setReflection("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl grid gap-6">
        <div className="grid gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            优势发现互动小应用（6 维升级版）
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              发现你的优势，从"做得顺、别人也认可"的地方开始
            </h1>
            <p className="mt-2 text-base md:text-lg text-slate-600">
              这是一个面向职场人的轻量原型：通过 12 道问题，帮助用户识别 6 类优势倾向，并给出可落地的行动建议。
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle>这个版本能做什么？</CardTitle>
                    <CardDescription>
                      先用一个可运行的雏形，帮助你快速验证：用户是否愿意测、结果是否有启发。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 text-slate-700">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.values(DIMENSIONS).map((item) => (
                        <div key={item.name} className="rounded-2xl border p-4 bg-slate-50">
                          <div className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${item.color}`}>
                            {item.name}
                          </div>
                          <p className="mt-2 text-sm leading-6">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-dashed p-4 bg-white">
                      <p className="text-sm leading-6">
                        说明：当前结果用于<strong>启发式探索</strong>，不是专业测评。后续你可以继续加入：更多题库、反向题、他人反馈、报告下载、AI 个性化解读等能力。
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <Button onClick={() => setStep("quiz")} className="rounded-2xl">
                        开始体验 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => setStep("blueprint")} className="rounded-2xl">
                        先看产品蓝图
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle>适合谁？</CardTitle>
                    <CardDescription>尤其适合第一次做面向职场人的互动小应用</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-700 grid gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">想帮助职场人做自我认知与优势发现</div>
                    <div className="rounded-xl bg-slate-50 p-3">想先验证"用户会不会愿意测、结果有没有被说中"</div>
                    <div className="rounded-xl bg-slate-50 p-3">希望后续升级为培训、教练、团队发展工具</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {step === "blueprint" && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle>产品蓝图（适合小白的 4 步）</CardTitle>
                  <CardDescription>先做能跑的，再做更准的，最后做更个性化的反馈。</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                  <div className="rounded-2xl border p-4">
                    <div className="font-semibold text-slate-900">第 1 步：明确最小目标</div>
                    <p className="mt-2 leading-6">先让用户测完以后，能拿到 1-2 个优势倾向 + 一点现实可用的建议。</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="font-semibold text-slate-900">第 2 步：设计轻量题库</div>
                    <p className="mt-2 leading-6">当前版本使用 12 题，每题 4 个选项，覆盖 6 个优势维度，先确保体验顺滑。</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="font-semibold text-slate-900">第 3 步：输出结果反馈</div>
                    <p className="mt-2 leading-6">结果页给出 Top2 优势、典型表现、适合场景、提醒和行动建议，增强"被说中"的感觉。</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="font-semibold text-slate-900">第 4 步：持续升级</div>
                    <p className="mt-2 leading-6">后续再加入：反向题、自由文本 AI 解读、团队版画像、用户历史记录与分享能力。</p>
                  </div>
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <Button onClick={() => setStep("quiz")} className="rounded-2xl">
                      直接体验原型
                    </Button>
                    <Button variant="outline" onClick={() => setStep("intro")} className="rounded-2xl">
                      返回首页
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle>优势探索问答</CardTitle>
                      <CardDescription>
                        第 {current + 1} / {QUESTIONS.length} 题
                      </CardDescription>
                    </div>
                    <Badge className="rounded-full px-3 py-1">MVP 测试版</Badge>
                  </div>
                  <Progress value={progress} className="mt-3" />
                </CardHeader>

                <CardContent className="grid gap-4">
                  <div className="rounded-2xl bg-slate-50 p-5 text-lg font-medium text-slate-900 leading-8">
                    {QUESTIONS[current].text}
                  </div>

                  <div className="grid gap-3">
                    {QUESTIONS[current].options.map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="rounded-2xl h-auto justify-start whitespace-normal px-4 py-4 text-left leading-6 hover:bg-slate-50"
                        onClick={() => handleAnswer(option.dimension)}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "result" && top1 && top2 && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      你的优势初步画像
                    </CardTitle>
                    <CardDescription>{summary}</CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-4">
                    <div className="rounded-2xl border border-dashed p-4 bg-white text-sm leading-7 text-slate-700">
                      {comboMessage}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="rounded-2xl border p-4 bg-slate-50">
                        <div className="text-xs font-semibold tracking-wide text-slate-500">
                          你在团队中常呈现的角色
                        </div>
                        <div className="mt-2 text-lg font-semibold text-slate-900">{top1.role}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          很多时候，别人感受到你的价值，往往先来自这一面。
                        </p>
                      </div>

                      <div className="rounded-2xl border p-4 bg-slate-50">
                        <div className="text-xs font-semibold tracking-wide text-slate-500">
                          容易被低估的地方
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-700">{top2.underrated}</div>
                      </div>

                      <div className="rounded-2xl border p-4 bg-slate-50">
                        <div className="text-xs font-semibold tracking-wide text-slate-500">
                          更适合你的工作方式
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-700">{workStyle}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {[top1, top2].map((item, idx) => (
                        <div key={item.key} className="rounded-2xl border p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${item.color}`}>
                              {item.value === top1.value && top1.value === top2.value
                                ? `并列优势 · ${item.name}`
                                : `TOP ${idx + 1} · ${item.name}`}
                            </div>
                            <div className="text-sm font-semibold text-slate-500">{item.value} 分</div>
                          </div>

                          <p className="mt-3 text-sm text-slate-700 leading-6">{item.detail}</p>

                          <div className="mt-4 grid gap-3">
                            <div>
                              <div className="text-xs font-semibold tracking-wide text-slate-500">适合场景</div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.scenes.map((scene, i) => (
                                  <Badge key={i} variant="outline" className="rounded-full">
                                    {scene}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900 leading-6">
                              <span className="font-semibold">别人常先感受到的你：</span>
                              {item.role}
                            </div>

                            <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900 leading-6">
                              <span className="font-semibold">提醒：</span>
                              {item.reminder}
                            </div>

                            <div className="grid gap-2">
                              {item.actions.map((action, i) => (
                                <div key={i} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700 leading-6">
                                  {action}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-dashed p-4 bg-white">
                      <div className="font-semibold text-slate-900">你可以这样进一步验证结果</div>
                      <ul className="mt-2 list-disc pl-5 text-sm leading-7 text-slate-700">
                        {validationPrompts.map((prompt, idx) => (
                          <li key={idx}>{prompt}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle>补充一句你的真实体验</CardTitle>
                    <CardDescription>这一步有助于以后升级成更真实、更个性化的 AI 反馈版本。</CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-4">
                    <Textarea
                      placeholder="例如：我在复杂任务里比较容易先把问题理顺，也常常被同事叫去一起看方案方向。"
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      className="min-h-[140px] rounded-2xl"
                    />

                    <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700 leading-6">
                      后续升级方向：把这段文字接入 AI 解析，结合答题结果，输出更贴近个人经历的优势描述与建议。
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={handleRestart} variant="outline" className="rounded-2xl">
                        <RotateCcw className="mr-2 h-4 w-4" /> 再测一次
                      </Button>
                      <Button onClick={() => setStep("blueprint")} className="rounded-2xl">
                        看下一步产品设计
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
