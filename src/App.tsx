import { useMemo, useState } from 'react'

type Project = {
  id: string
  name: string
  year: string
  category: string
  tags: string[]
  filters: string[]
  repo: string
  summary: string
  role: string
  details: string[]
}

type Note = {
  title: string
  description: string
}

const profile = {
  name: 'xyxiao001',
  title: '前端开发者',
  intro:
    '主要做前端开发，长期关注复杂交互、组件抽象和产品体验。这个网站想做得更像一个真实的个人主页：不夸张地介绍自己，认真把做过的东西讲清楚。',
  github: 'https://github.com/xyxiao001',
  website: 'https://github.xyxiao.cn',
}

const introFacts = [
  '做过图片裁剪、富文本编辑器、本地音乐应用',
  '习惯把复杂交互拆成能复用的组件和规则',
  '同时使用 Vue 与 React，也关注完整产品体验',
]

const notes: Note[] = [
  {
    title: '我比较擅长什么',
    description:
      '如果一个页面里有很多状态联动、拖拽缩放、边界约束、实时预览，我通常会比较有兴趣，也愿意把这些细节打磨好。',
  },
  {
    title: '我喜欢怎么做项目',
    description:
      '我不太喜欢只停留在“页面做完了”。如果一个功能值得沉淀，我会倾向把它整理成组件、独立库，或者至少保留清晰的接口与结构。',
  },
  {
    title: '我在意的不是只有代码',
    description:
      '我会在意交互是不是顺手、信息组织是不是清楚、功能是不是能真正被人用起来。这也是为什么我会一直做个人项目。',
  },
]

const focuses = [
  '复杂交互',
  '组件封装',
  '工程可维护性',
  '产品体验',
  'Vue / React 双栈',
  '个人项目持续迭代',
]

const workingStyle = [
  {
    title: '先想清楚交互规则',
    description:
      '图片旋转后怎么限制边界、裁剪框如何约束、预览怎么同步，这类问题我会先把规则想清楚，再写代码。',
  },
  {
    title: '再把能力沉淀下来',
    description:
      '一个功能如果反复出现，我更愿意把它做成可复用的接口和组件，而不是每次都临时拼起来。',
  },
  {
    title: '最后让它像个产品',
    description:
      '无论是编辑器还是音乐应用，我都会关心信息层次、状态恢复、视觉节奏这些离“能跑”更远一点的东西。',
  },
]

const currentState = [
  '继续完善个人网站，把它变成一个长期更新的作品入口',
  '保持对图片交互、编辑器和本地优先应用的兴趣',
  '希望在组件设计之外，也持续做更完整的产品型项目',
]

const projects: Project[] = [
  {
    id: 'cropper-next-vue',
    name: 'cropper-next-vue',
    year: '2026',
    category: 'Vue 3 图片裁剪库',
    tags: ['Vue 3', 'TypeScript', 'Library'],
    filters: ['全部', 'Vue', '组件库'],
    repo: 'https://github.com/xyxiao001/cropper-next-vue',
    summary:
      '一个独立发布的 Vue 3 图片裁剪库，重点处理旋转后的边界判断、图像约束、高分屏导出和实时预览。',
    role: '这是我把图片裁剪能力升级到 Vue 3 和现代工程体系的一次集中整理。',
    details: [
      '重点不只是“裁剪”，而是裁剪过程中所有边界与联动行为',
      '支持高分屏导出和实时预览，更接近真实业务场景',
      '文档站和库构建拆分后，发布和维护都更清晰',
    ],
  },
  {
    id: 'vue-cropper',
    name: 'vue-cropper',
    year: '2017 → 持续演进',
    category: 'Vue 图片裁剪项目',
    tags: ['Vue', 'Canvas', 'Image Tooling'],
    filters: ['全部', 'Vue', '组件库'],
    repo: 'https://github.com/xyxiao001/vue-cropper',
    summary:
      '比较早期也比较有代表性的图片裁剪项目，覆盖了预览、缩放、截图框控制、导出等常见需求。',
    role: '这个项目是我长期做图片编辑交互的起点，也影响了后续很多思路。',
    details: [
      '把高频图片裁剪能力做成更容易接入的组件',
      '很多后来在新库里处理的问题，其实都能追溯到这里',
      '它让我更确定自己适合做复杂交互型前端工作',
    ],
  },
  {
    id: 'vue-editor',
    name: 'vue-editor-prose-kit',
    year: '2026',
    category: 'Vue 3 富文本编辑器',
    tags: ['Vue 3', 'Tiptap', 'DOMPurify'],
    filters: ['全部', 'Vue', '组件库'],
    repo: 'https://github.com/xyxiao001/vue-editor',
    summary:
      '基于 Vue 3 和 Tiptap 的富文本编辑器组件库，支持可配置工具栏、图片上传适配和内容安全清洗。',
    role: '它让我把注意力从图像交互继续扩展到内容编辑场景。',
    details: [
      '不是简单封装编辑器，而是围绕业务接入去组织能力',
      '工具栏与上传接口都尽量保留可配置空间',
      '内容安全处理说明这个项目是按可上线的标准在考虑',
    ],
  },
  {
    id: 'hzfe-music',
    name: 'hzfe-music',
    year: '2026',
    category: 'React 19 本地音乐应用',
    tags: ['React 19', 'TypeScript', 'MobX'],
    filters: ['全部', 'React', '应用'],
    repo: 'https://github.com/xyxiao001/hzfe-music',
    summary:
      '一个本地优先的音乐资料库应用，包含歌曲与歌词管理、专辑浏览、播放队列、歌词联动和状态恢复。',
    role: '这是我在 React 栈里做完整产品体验的一次比较集中的实践。',
    details: [
      '项目重点不是某个组件，而是完整体验如何组织起来',
      '从本地存储到播放状态恢复，比较强调“真能长期使用”',
      '也让我能在 React 中继续验证自己对产品体验的判断',
    ],
  },
  {
    id: 'vue-blog',
    name: 'vue-blog',
    year: '2016 → 2017',
    category: 'Vue 2 早期博客',
    tags: ['Vue 2', 'Blog', 'Product'],
    filters: ['全部', 'Vue', '应用'],
    repo: 'https://github.com/xyxiao001/vue-blog',
    summary:
      '比较早期的个人博客项目，也是我第一次比较完整地把页面、内容和产品感放到一个网站里。',
    role: '现在看会有些青涩，但它确实是很多后续方向的起点。',
    details: [
      '最早开始形成“网站应该是一个完整产品”的感觉',
      '持续迭代的习惯，从这个阶段就已经很明显',
      '很多后来更成熟的判断，都能从这里找到早期影子',
    ],
  },
]

const filters = ['全部', 'Vue', 'React', '组件库', '应用']

const timeline = [
  {
    year: '2016',
    title: '开始做个人网站',
    text: '从博客开始接触完整的网站表达，而不只是单个页面。',
  },
  {
    year: '2017',
    title: '进入图片交互方向',
    text: '通过 vue-cropper 深入裁剪、缩放、预览和边界处理。',
  },
  {
    year: '2026',
    title: '升级 Vue 3 组件能力',
    text: '把图片裁剪和编辑器方向继续做成更现代的 Vue 3 项目。',
  },
  {
    year: '2026',
    title: '继续做完整应用',
    text: '开始在 React 里做更完整的产品体验，例如本地音乐应用。',
  },
]

function ProjectSection({
  activeProject,
  onSelect,
  activeFilter,
  onFilterChange,
}: {
  activeProject: Project
  onSelect: (id: string) => void
  activeFilter: string
  onFilterChange: (value: string) => void
}) {
  const filteredProjects = useMemo(() => {
    if (activeFilter === '全部') {
      return projects
    }

    return projects.filter((project) => project.filters.includes(activeFilter))
  }, [activeFilter])

  return (
    <section className="section" id="projects">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Selected Work</p>
          <h2>一些比较能代表我的项目</h2>
        </div>
        <p className="section-copy">
          我更想把这里写成“项目说明”而不是“项目吹捧”。每个项目都代表一个阶段，也对应一种我比较在意的能力。
        </p>
      </div>

      <div className="filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-pill ${filter === activeFilter ? 'is-active' : ''}`}
            onClick={() => onFilterChange(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="project-grid">
        <div className="project-list">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              className={`project-card ${activeProject.id === project.id ? 'is-active' : ''}`}
              onClick={() => onSelect(project.id)}
              type="button"
            >
              <div className="project-meta">
                <span>{project.year}</span>
                <span>{project.category}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <article className="panel project-detail">
          <div className="project-detail-top">
            <div>
              <p className="section-kicker">{activeProject.category}</p>
              <h3>{activeProject.name}</h3>
            </div>
            <a href={activeProject.repo} target="_blank" rel="noreferrer">
              打开仓库
            </a>
          </div>

          <p className="project-impact">{activeProject.role}</p>

          <div className="tag-list">
            {activeProject.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="detail-list">
            {activeProject.details.map((detail) => (
              <div key={detail} className="detail-row">
                <span className="detail-dot"></span>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('全部')
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)

  const filteredProjects = useMemo(() => {
    if (activeFilter === '全部') {
      return projects
    }

    return projects.filter((project) => project.filters.includes(activeFilter))
  }, [activeFilter])

  const activeProject =
    filteredProjects.find((project) => project.id === activeProjectId) ?? filteredProjects[0]

  return (
    <div className="app-shell">
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>

      <header className="topbar">
        <a className="brand" href="#hero">
          {profile.name}
        </a>
        <nav className="nav">
          <a href="#about">关于</a>
          <a href="#focus">关注点</a>
          <a href="#projects">项目</a>
          <a href="#timeline">轨迹</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <main className="page-shell">
        <section className="hero" id="hero">
          <div className="hero-copy">
            <p className="section-kicker">{profile.title}</p>
            <h1>你好，我是 xyxiao001。</h1>
            <p className="hero-intro">{profile.intro}</p>

            <div className="intro-list">
              {introFacts.map((item) => (
                <span key={item} className="intro-pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <a className="primary-link" href="#projects">
                看看我做过什么
              </a>
              <a className="secondary-link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <aside className="panel hero-panel">
            <p className="eyebrow-note">关于这个网站</p>
            <div className="hero-note">
              <p>
                我不太想把个人网站写成一堆夸张词汇的堆叠，所以这里更像一份简短的自我介绍：
                我做什么、做过什么、现在还在继续关注什么。
              </p>
            </div>
            <div className="fact-grid">
              <div className="fact-card">
                <strong>方向</strong>
                <span>复杂交互、组件抽象、体验型应用</span>
              </div>
              <div className="fact-card">
                <strong>技术</strong>
                <span>Vue、React、TypeScript</span>
              </div>
              <div className="fact-card">
                <strong>习惯</strong>
                <span>做个人项目，持续迭代，不太喜欢半成品</span>
              </div>
              <div className="fact-card">
                <strong>部署</strong>
                <span>GitHub Pages 与 Vercel 双部署</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="section" id="about">
          <div className="section-heading">
            <div>
              <p className="section-kicker">About</p>
              <h2>我想把网站写得更像“人”，而不是“模板”</h2>
            </div>
            <p className="section-copy">
              对我来说，个人网站更像一个长期更新的入口。它不是简历替代品，而是把兴趣、项目和技术判断放在一起的地方。
            </p>
          </div>

          <div className="highlight-grid">
            {notes.map((item) => (
              <article key={item.title} className="panel info-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="focus">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Focus</p>
              <h2>这些关键词，大概能概括我现在的关注点</h2>
            </div>
          </div>

          <div className="strength-grid">
            {focuses.map((item, index) => (
              <div key={item} className="panel strength-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <ProjectSection
          activeProject={activeProject}
          onSelect={setActiveProjectId}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Working Style</p>
              <h2>我通常是怎么思考一个前端项目的</h2>
            </div>
          </div>

          <div className="highlight-grid">
            {workingStyle.map((item) => (
              <article key={item.title} className="panel info-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="timeline">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Timeline</p>
              <h2>从博客、组件，到完整应用</h2>
            </div>
          </div>

          <div className="timeline-grid">
            {timeline.map((item) => (
              <article key={`${item.year}-${item.title}`} className="panel timeline-card">
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Now</p>
              <h2>现在想继续做的事</h2>
            </div>
          </div>

          <div className="feature-grid">
            {currentState.map((feature) => (
              <div key={feature} className="panel feature-card">
                <strong>{feature}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="panel contact-card">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>如果你也对这些方向感兴趣，欢迎来看看我的项目</h2>
              <p className="section-copy">
                这个站点现在使用 Vite 构建，同时适配 GitHub Pages 和 Vercel。后面我会继续补充内容，而不只是停在一个“展示页”上。
              </p>
            </div>

            <div className="contact-actions">
              <a className="primary-link" href={profile.github} target="_blank" rel="noreferrer">
                查看 GitHub
              </a>
              <a className="secondary-link" href={profile.website} target="_blank" rel="noreferrer">
                打开当前域名
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
