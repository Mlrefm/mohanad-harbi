export const profile = {
  name: 'Mohanad Abdulsattar Harbi',
  shortName: 'Mohanad Harbi',
  headline: 'IT Manager | Network Infrastructure Specialist | Hospitality IT Expert',
  location: 'Erbil, Iraq',
  email: 'mohandharbe59@gmail.com',
  phones: ['+964 750 896 9908', '+964 778 293 1412'],
  linkedin: 'https://www.linkedin.com/in/mohanad-harbi',
  cv: 'cv/Mohanad_Harbi_IT.pdf',
  photos: {
    graduate: 'photos/graduate.jpeg',
    portrait: 'photos/portrait.jpeg',
  },
  summary:
    'Results-driven IT Manager and Network Infrastructure Specialist with extensive experience delivering end-to-end IT operations in the hospitality sector. I run enterprise networks (Cisco, Huawei, MikroTik, UniFi), Property Management Systems, POS platforms, financial systems, and cybersecurity controls — with a zero-downtime target.',
  about: [
    'I currently lead all IT operations as the sole IT responsible at Darin Plaza Hotel in Erbil: VMware ESXi, physical servers, UniFi Dream Machine, VLAN segmentation, firewalls, backups, and the systems that keep Front Office, F&B, Finance, and HR running.',
    'Before that I was IT Officer at Radisson Blu Resort & Spa Korek Mountain, working to Radisson global standards on PMS, POS, SunSystems, Materials Control, tape-library backups, and hotel-wide wireless.',
    'I hold a B.Sc. in Information Technology from the Catholic University in Erbil (2021–2025), and I also design and ship software: a Windows scanner suite, TV media apps, a 3D virtual campus, and a bilingual digital invitations platform.',
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Proficient' },
    { name: 'Kurdish', level: 'Basic' },
  ],
  education: {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Catholic University in Erbil',
    years: '2021 – 2025',
    coursework:
      'Network Infrastructure, Cybersecurity, Database Management, System Administration, Software Development',
  },
  stats: [
    { value: 6, suffix: '+', label: 'Featured projects' },
    { value: 4, suffix: '+', label: 'Years in networking' },
    { value: 2, suffix: '', label: 'Hotel IT roles' },
    { value: 0, suffix: '', label: 'Downtime target' },
  ],
}

export const experience = [
  {
    role: 'IT Infrastructure Manager',
    org: 'Darin Plaza Hotel',
    place: 'Erbil, Iraq',
    period: '2026 — Present',
    points: [
      'Lead all IT operations as the sole IT owner for a full-service hotel across Cisco, Huawei, MikroTik, and UniFi.',
      'Deploy and administer VMware ESXi, including VMs for domain, applications, and backup hosts.',
      'Install and rack physical servers with BIOS/UEFI tuning and RAID for performance and redundancy.',
      'Run UniFi Dream Machine as the gateway: firewall, IDS/IPS, VPN, and traffic management.',
      'Design VLAN segmentation and ACLs to separate guest, staff, and management networks.',
      'Administer Omega PMS, POS, finance, and inventory systems with a zero-downtime target.',
    ],
  },
  {
    role: 'IT Officer',
    org: 'Radisson Blu Resort & Spa Korek Mountain',
    place: 'Erbil, Iraq',
    period: '2025',
    points: [
      'Administered PMS and POS so hotel operations stayed seamless.',
      'Managed Materials Control, SunSystems, and payroll for Finance and HR.',
      'Operated enterprise tape-library backups for data protection and compliance.',
      'Handled firewalls, switches, routers, access points, and VLAN segmentation.',
      'Delivered IT service to Radisson global standards and SLA commitments.',
    ],
  },
  {
    role: 'Network Technician (Freelance)',
    org: 'Independent clients',
    place: 'Erbil, Iraq',
    period: '2022 — 2024',
    points: [
      'Designed LAN/WAN solutions for small and medium offices, including structured cabling.',
      'Configured routers, managed switches, wireless APs, IP addressing, and subnetting.',
      'Set up firewalls and VPN, then supported clients with troubleshooting and maintenance.',
    ],
  },
  {
    role: 'Residential Electrician',
    org: 'Independent',
    place: 'Erbil, Iraq',
    period: '2019 — 2022',
    points: [
      'Electrical installation, preventive maintenance, and safety inspections.',
      'Smart-home automation and IoT device configuration.',
    ],
  },
]

export const skillGroups = [
  {
    title: 'Networking',
    items: [
      'Cisco routing & switching',
      'Huawei enterprise',
      'MikroTik RouterOS',
      'UniFi / UDM',
      'VLANs & ACLs',
      'VPN',
      'TCP/IP & subnetting',
      'Wireless LAN',
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      'VMware ESXi',
      'Windows Server',
      'Active Directory',
      'RAID & racking',
      'Backup & DR',
      'Linux basics',
      'Cloud (IaaS/PaaS/SaaS)',
      'System hardening',
    ],
  },
  {
    title: 'Hospitality IT',
    items: [
      'Omega PMS',
      'POS systems',
      'SunSystems',
      'Materials Control',
      'Payroll systems',
      'Tape library backup',
      'Hotel wireless',
      'SLA delivery',
    ],
  },
  {
    title: 'Security',
    items: [
      'Firewall administration',
      'Network defense',
      'Vulnerability assessment',
      'Access control',
      'Kali Linux tools',
      'Risk management',
    ],
  },
  {
    title: 'Software',
    items: [
      'HTML / CSS / JavaScript',
      'Python',
      'C#',
      'Java',
      'PHP',
      'SQL',
      'Bash',
      'n8n automation',
    ],
  },
]

export const certifications = [
  'Network Defense',
  'Practical Cisco Networking Labs',
  'Computer Networks Fundamentals',
  'Mastering Network Security',
  'Kali Linux for Ethical Hackers',
  'Mastering Linux Command',
]

export type ProjectCategory = 'All' | 'Software' | 'Networking' | '3D / Design'

export type Project = {
  slug: string
  title: string
  summary: string
  idea: string
  benefit: string
  reason: string
  description: string
  category: Exclude<ProjectCategory, 'All'>
  role: string
  year: string
  tech: string[]
  cover: string
  gallery: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'mh-universal-scanner',
    title: 'MH Universal Scanner',
    summary: 'Scan another page into the same PDF — previous pages stay. Vendor scanner apps almost never do this.',
    idea: 'Build a live document session: scan page 1, then add page 2, 3, 10 into the same paper trail without starting over. Append, insert, rescan, rotate, or reorder — the old scans stay.',
    benefit: 'Hotel reception, offices, and anyone scanning IDs or multi-page files get one clean PDF. One extra page does not wipe the work already done. Preview before save, recover if the app crashes.',
    reason:
      'I built it because no scanner app I used would add another scan to the same document without losing the old pages. Brand tools (Canon, Epson, Windows Fax and Scan) either save one file per click or drop the session. That is the gap this app fills.',
    description:
      'Windows desktop utility for USB and network scanners. Canon-style tray: pick a device, set DPI, paper, color, source and duplex, preview every page, then finish as PDF. WIA first, with room for TWAIN and eSCL so it is not locked to one vendor.',
    category: 'Software',
    role: 'Product design & full development',
    year: '2026',
    tech: ['Windows', 'WIA', 'PDF', 'Desktop'],
    cover: 'projects/scanner/cover.png',
    gallery: ['projects/scanner/cover.png', 'projects/scanner/app.png'],
    featured: true,
  },
  {
    slug: 'mhtv',
    title: 'MHTV+',
    summary: 'One TV player for LG, Samsung, and Android — same UI, managed servers, no secrets on the device.',
    idea: 'One media-player product that looks and works the same on LG webOS, Samsung Tizen, and Android TV: Xtream codes, M3U URL/file, and a subscription list of servers.',
    benefit: 'Homes and hotels can install the same experience on mixed TV brands. Login and device binding live on a backend, so app builds do not ship API tokens. Reload servers without rebuilding the TV app.',
    reason:
      'I built it because every TV brand ships a different, locked player, and typical IPTV apps either leak credentials on the device or force a new UI per platform. I needed one interface I control, with a subscription layer I can update from the server.',
    description:
      'Shared HTML/CSS/JS shell on LG and Samsung; Android wraps the same UI in a WebView with ExoPlayer. GitHub server config is fetched through a Railway auth API after username + device_id — tokens never sit in the TV package.',
    category: 'Software',
    role: 'App & platform development',
    year: '2026',
    tech: ['LG webOS', 'Samsung Tizen', 'Android TV', 'ExoPlayer'],
    cover: 'projects/mhtv/cover.png',
    gallery: [
      'projects/mhtv/cover.png',
      'projects/mhtv/servers.png',
      'projects/mhtv/app1.png',
      'projects/mhtv/app2.png',
    ],
    featured: true,
  },
  {
    slug: 'mh-virtual-university',
    title: 'MH Virtual Learning World',
    summary: 'A real 3D university — not a website, not a game. Walk in, learn, lab, exam, certificate.',
    idea: 'Put a full digital campus in Unreal Engine 5: gate, plazas, IT college, library, labs, AI staff, and a student journey from first class to certificate. First program is CCNA, with classroom + networking lab.',
    benefit: 'A student practices like they are on campus — walk, talk to NPCs, sit the lab, take the exam — instead of watching disconnected videos. Progress and certificates stay with the account.',
    reason:
      'I built it because online IT courses explain networks but never let you live the campus path. I wanted a place where CCNA and IT study feel physical: buildings, teachers, labs, and a real academic track in 3D.',
    description:
      'World design and product architecture: Unreal Engine 5, MetaHuman characters, LLM-driven NPCs, and a CCNA-first learning path with classroom A, networking-lab practice, exams, and certificates.',
    category: '3D / Design',
    role: 'World design, product architecture & Unreal plan',
    year: '2026',
    tech: ['Unreal Engine 5', 'MetaHuman', 'LLM NPCs', 'CCNA labs'],
    cover: 'projects/university/campus.png',
    gallery: [
      'projects/university/campus.png',
      'projects/university/gate.png',
      'projects/university/plaza.png',
    ],
    featured: true,
  },
  {
    slug: 'smart-invitations',
    title: 'Smart Invitations & Events',
    summary: 'Arabic-first event OS: invitation → RSVP → QR check-in → memories. Not just a pretty card.',
    idea: 'One bilingual SaaS for the whole event, not only a digital card: pick a template, publish, invite, collect RSVPs, run the door with QR, then keep photos and a guestbook.',
    benefit: 'Families and organizers in Arabic (full RTL) and English get one link instead of WhatsApp chaos, paper lists, and a separate check-in tool. Cinematic templates, ticketing, and post-event memories in the same product.',
    reason:
      'I built it because most invitation sites are English-first, wedding-only, or stop at a pretty page. In this region the hard part is the full lifecycle — replies, attendance, the event day — in Arabic, without hiring a developer.',
    description:
      'Next.js platform: Arabic-first RTL, English toggle, GSAP templates, unique guest links, QR check-in, live event display for TVs, and a path from create → invite → RSVP → door → gallery.',
    category: 'Software',
    role: 'Product architecture, UX & frontend',
    year: '2026',
    tech: ['Next.js', 'GSAP', 'Arabic RTL', 'RSVP'],
    cover: 'projects/invitations/cover.png',
    gallery: [
      'projects/invitations/cover.png',
      'projects/invitations/cover2.png',
      'projects/invitations/cover3.png',
    ],
    featured: true,
  },
  {
    slug: 'campus-network',
    title: 'Campus Network Design',
    summary: 'Two cores, not one. If a campus core dies, the university should keep routing.',
    idea: 'A Packet Tracer campus with dual redundant OSPF cores, aggregated trunks, spanning-tree per VLAN, and a separate network for every role: ICT admin, HR, academics, printers, phones, APs, guest Wi-Fi, student Wi-Fi.',
    benefit: 'Failover instead of a single point of failure. Guest and student Wi-Fi stay off staff systems. Addressing, DHCP, DNS, AAA, NTP, HTTP, and email are documented so the design can be built for real.',
    reason:
      'I built it as my final-year research because campus networks are often drawn as one core and a flat LAN. That fails under growth and a single hardware fault. I wanted a topology that scales and survives.',
    description:
      'Cisco Packet Tracer lab: dual cores, OSPF costs on redundant links, MPO trunks carrying VLANs, per-VLAN STP priorities, and a service farm (HTTP, email, NTP, DHCP+AAA, DNS).',
    category: 'Networking',
    role: 'Network architect (final-year project)',
    year: '2025',
    tech: ['Cisco Packet Tracer', 'OSPF', 'VLANs', 'STP'],
    cover: 'projects/campus/cover.png',
    gallery: ['projects/campus/cover.png'],
    featured: true,
  },
  {
    slug: 'hotel-network',
    title: 'Hotel Management Networking',
    summary: 'Guest Wi-Fi never touches PMS, POS, or staff. That is the whole hotel-network idea.',
    idea: 'A multi-zone hotel topology for Erbil: core vs satellite services, real floor plans, and VLANs that split IT admin, HR, F&B, printers, phones, APs, guest Wi-Fi, and staff Wi-Fi.',
    benefit: 'Hospitality systems (PMS/POS) sit on a locked management plane. Guests stay isolated. Floors are designed as they actually are, so cabling and access follow the building, not a generic diagram.',
    reason:
      'I built it because hotel IT — my day job — breaks when guest, staff, and property systems share one flat network. Guests get a path into operations; one virus or noisy device can take down check-in. Isolation is the product.',
    description:
      'Enterprise hotel design with firewalls, VLAN legend, dual campus zones, and 1st/2nd floor office layouts (HR, finance, reception, store) mapped onto the same addressing plan.',
    category: 'Networking',
    role: 'Network architect',
    year: '2025',
    tech: ['Cisco', 'VLANs', 'Firewall', 'PMS / POS'],
    cover: 'projects/hotel/cover.png',
    gallery: ['projects/hotel/cover.png'],
    featured: true,
  },
]

export const extraProjects = [
  {
    title: 'Image Encryption with Chaotic Maps & DNA',
    detail:
      'Idea: hide image data with chaotic maps and DNA encoding. Benefit: a second layer beyond a normal password. Why: course-level crypto that actually protects pictures, not only text.',
  },
  {
    title: 'Smart Home Automation (Packet Tracer)',
    detail:
      'Idea: one simulated home where lights, doors, and sensors follow rules. Benefit: test IoT before buying hardware. Why: show automation and VLANs in a house, not only in an office.',
  },
  {
    title: 'Secure File Manager (Batch)',
    detail:
      'Idea: a Windows Batch manager with access control and a log. Benefit: lock folders without installing extra software. Why: a small, auditable tool for machines that cannot run a full suite.',
  },
]
