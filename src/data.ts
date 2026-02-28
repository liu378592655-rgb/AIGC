export const personalInfo = {
  name: "刘晁佳",
  title: "设计总监 / 经理",
  basic: [
    "男 / 籍贯 揭阳",
    "非党员",
    "11年工作经验"
  ],
  intention: {
    role: "设计总监/经理",
    salary: "20-30K",
    city: "广州"
  },
  contact: {
    phone: "13226158335",
    email: "378592655@qq.com"
  },
  advantages: [
    {
      title: "AI视觉创作全流程实操",
      desc: "擅长AI视觉创作全流程实操，精通ComfyUI工作流搭建、调试与优化，可灵活适配多元创作需求；熟练运用Lovart、Midjourney完成创意视觉生成、风格化迭代与精准出图，兼具审美与商业落地能力。"
    },
    {
      title: "高效批量创作与模型训练",
      desc: "擅长通过RunningHub高效实现批量视觉创作与工作流快速运行，熟悉Liblib平台模型检索、调用、管理与优质资源复用；独立掌握LoRA模型训练全流程，技术应用经验扎实。"
    },
    {
      title: "团队赋能与体系搭建",
      desc: "为公司组建AI创作专项团队，负责团队成员AI技能培训、实操指导与能力提升，定制适配业务场景的实用AI工作流，统筹推进团队AI创作落地与效率优化。"
    }
  ]
};

export const categories = [
  {
    id: "appliances",
    title: "家电",
    subtitle: "Home Appliances",
    cover: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    seed: "appliance"
  },
  {
    id: "beauty",
    title: "美妆",
    subtitle: "Beauty & Cosmetics",
    cover: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800",
    seed: "cosmetics"
  },
  {
    id: "home",
    title: "家居",
    subtitle: "Home Furnishing",
    cover: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    seed: "furniture",
    customImages: [
      {
        id: "home-custom-1",
        url: "https://raw.githubusercontent.com/liu378592655-rgb/AIGC/main/%E5%AE%B6%E5%B1%8501.jpg",
        title: "夜的流线 | THE EVENING FLOW"
      }
    ]
  },
  {
    id: "clothing",
    title: "服装",
    subtitle: "Fashion & Clothing",
    cover: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
    seed: "fashion"
  }
];
