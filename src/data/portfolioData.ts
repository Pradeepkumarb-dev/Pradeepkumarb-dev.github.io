import { WorkExperience, Project, RegisterMapItem, EducationItem, CanFrame } from '../types';

export const RESUME_FILENAME = 'PradeepkumarB_EmbeddedsoftwareEngineer.pdf';
export const RESUME_DOWNLOAD_URL = `/${RESUME_FILENAME}`;

export const PERSONAL_INFO = {
  fullName: 'Pradeep Kumar Balasubramanian',
  preferredName: 'Pradeep Kumar B.',
  title: 'Embedded Software Engineer',
  specialization: 'Automotive Telematics, RTOS & Bootloaders',
  location: 'Pune, India',
  relocation: 'Open to relocation worldwide',
  email: 'pradeepkumarb.official@outlook.com',
  altEmail: 'pradeepkumarb1710@gmail.com',
  phone: '+91 83490 22220',
  linkedin: 'https://linkedin.com/in/pradeepkumarbofficial',
  github: 'https://github.com/Pradeepkumarb-dev',
  codeVault: 'https://github.com/Pradeepkumarb-dev/code-vault',
  website: 'https://pradeepkumarb-dev.github.io/',
  experienceYears: '4+',
  protocolsCount: '10+',
  platformsCount: '8+',
  summary: `Embedded Software Engineer with 4+ years of hands-on experience developing mission-critical firmware in C, C++, and Python across automotive and industrial systems. Strong background in RTOS-based deterministic design, custom secondary bootloaders, flash memory management, and automotive diagnostic protocols (CAN 2.0B, J1939, UDS ISO 15765-4, XCP, K-Line). Proven production experience deploying telematics units, managing FOTA campaigns, and engineering rugged industrial IoT controllers.`
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'intangles',
    role: 'Embedded Systems Engineer',
    company: 'Intangles Lab Pvt Ltd',
    location: 'Pune, India',
    period: 'Aug 2024 – Present',
    current: true,
    summary: 'Developing automotive telematics gateway units, secure bootloaders, and edge diagnostic pipelines for commercial fleet vehicles.',
    bullets: [
      'Engineered telematics firmware and custom secondary bootloaders on Renesas RA Series MCUs (Cortex-M33), designing flash partition layouts for dual-bank rollback, image authentication flags, and persistent configuration EEPROM emulation.',
      'Architected Quectel EC200 (QuecOpen / QL_RTOS) cellular SoC firmware to coordinate asynchronous CAN polling, multi-threaded ECU data pipelines, cloud telemetry streaming, and fail-safe FOTA updates.',
      'Integrated and validated high-speed automotive bus protocols: CAN 2.0B, SAE J1939, ISO 15765-4 (UDS diagnostics), XCP calibration, K-Line (ISO 9141), and J1708 for commercial vehicle diagnostics.',
      'Conducted bare-metal and OS-level debugging with logic analyzers and oscilloscopes, mitigating bus-off conditions, buffer overruns, and interrupt latency to ensure 99.98% communication reliability.',
      'Created a comprehensive Python desktop automation framework to simulate ECU diagnostic responses and automate full-cycle FOTA verification testing.',
      'Collaborated closely with cross-functional hardware, cloud backend, and validation teams for end-to-end device homologation and production scaling.'
    ],
    techStack: ['Embedded C', 'C++', 'Python', 'Renesas RA', 'Quectel EC200', 'QL_RTOS', 'CAN', 'J1939', 'UDS ISO 15765-4', 'FOTA', 'e² studio'],
    mcu: 'Renesas RA Series (ARM Cortex-M33) & Quectel EC200 LTE'
  },
  {
    id: 'nanotronics',
    role: 'Embedded Engineer',
    company: 'Nanotronics Scientific Solutions',
    location: 'Coimbatore, India',
    period: 'Jul 2020 – Aug 2022',
    current: false,
    summary: 'Engineered production embedded firmware for industrial automated fuel dispensers, telemetry hubs, and edge IoT devices.',
    bullets: [
      'Developed production-grade embedded firmware for automated fuel dispensing kiosks, fluid metering units, and industrial automation equipment in C/C++.',
      'Implemented robust multi-drop industrial communication protocols including MODBUS RTU over RS-485, multi-channel UART, SPI sensor interfaces, and MQTT telemetry over Wi-Fi.',
      'Integrated FreeRTOS kernel on STM32 and ESP32 targets, implementing deterministic task scheduling, inter-task message queues, mutexes, and low-jitter software timers.',
      'Authored hardware abstraction layer (HAL) drivers for flash memory, graphical LCD controllers, flow pulsers, optical encoders, and thermal receipt printers.',
      'Resolved critical hardware-software race conditions and EMI-induced system resets during high-voltage switching, increasing field MTBF significantly.'
    ],
    techStack: ['Embedded C', 'C++', 'FreeRTOS', 'STM32', 'ESP32', 'ESP8266', 'PIC', 'MODBUS RTU', 'RS-485', 'MQTT', 'STM32CubeIDE'],
    mcu: 'STM32 (ARM Cortex-M4), ESP32, PIC Microcontrollers'
  },
  {
    id: 'saeindia',
    role: 'Project Intern — Range-Extended EV',
    company: 'SAEINDIA (in collaboration with General Motors)',
    location: 'Bengaluru, India',
    period: 'Jul 2019 – Aug 2019',
    current: false,
    summary: 'Electronics lead for student prototype Range-Extended Electric Vehicle (REEV) engineering program.',
    bullets: [
      'Led the electronics and embedded control team for a student-built Range-Extended Electric Vehicle (REEV) initiative co-sponsored by General Motors.',
      'Engineered state-machine control logic for automated ICE range-extender generator start/stop sequencing and high-voltage contactor safety interlocks.',
      'Synthesized CAN telemetry packets between custom motor controller, battery management system (BMS), and driver instrumentation cluster.',
      'Awarded "Best Performance" and National Runner-Up accolade among 40+ engineering universities across India.'
    ],
    techStack: ['Embedded C', 'CAN Bus', 'Powertrain Control', 'State Machines', 'MATLAB/Simulink', 'Sensors Integration'],
    mcu: 'NXP / Microchip Automotive MCUs'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'code-vault',
    title: 'code-vault',
    category: 'vault',
    description: 'Centralized master GitHub repository housing personal embedded firmware modules, bare-metal microcontroller drivers, RTOS task synchronization primitives, communication stacks, and Python test automation scripts.',
    details: [
      'Bare-metal peripheral drivers (GPIO, UART, SPI, I2C, CAN 2.0B/FD, Hardware Timers)',
      'Circular buffer and FIFO ring queue implementations engineered for ISR-safe data streaming',
      'FreeRTOS task scheduling, priority inversion mitigation, queue messaging, and event groups',
      'Automotive protocol framing (CAN arbitration, J1939 PGN parsing, ISO-TP segmentation, UDS stubs)',
      'Python host utilities for UART/CAN packet logging, automated testing, and CRC checksums'
    ],
    repoUrl: 'https://github.com/Pradeepkumarb-dev/code-vault',
    tags: ['Embedded C', 'C++', 'Python', 'FreeRTOS', 'HAL Drivers', 'Automotive CAN', 'Open Source'],
    featured: true,
    architecture: 'Master Embedded Monorepo'
  }
];

export const REGISTER_MAP: RegisterMapItem[] = [
  {
    address: '0x00',
    name: 'CORE_LANG_REG',
    description: 'Primary programming languages & system scripting',
    bits: ['Embedded C (MISRA-C)', 'C++ (C++14/17)', 'Python 3.x', 'Bash / Shell', 'Assembly (ARM)']
  },
  {
    address: '0x04',
    name: 'MCU_PLATFORM_REG',
    description: 'Target microcontrollers, architectures & SoCs',
    bits: ['ARM Cortex-M (STM32)', 'Renesas RA Series (M33)', 'Renesas RH850', 'ESP32 / ESP8266', 'Microchip PIC', 'Quectel EC200 (LTE Cat 1)', 'Raspberry Pi', 'Arduino']
  },
  {
    address: '0x08',
    name: 'RTOS_SYSTEM_REG',
    description: 'Real-Time operating systems & kernel architecture',
    bits: ['FreeRTOS', 'QL_RTOS (QuecOpen)', 'Custom Secondary Bootloaders', 'Deterministic Task Scheduling', 'Queues / Mutexes / Semaphores', 'Flash Partitioning / Dual-Bank', 'Low-Power Modes (Sleep/Deep Sleep)', 'ISR Optimization']
  },
  {
    address: '0x0C',
    name: 'BUS_PROTOCOL_REG',
    description: 'Automotive, industrial, and peripheral bus protocols',
    bits: ['CAN 2.0B', 'SAE J1939', 'ISO 15765-4 (UDS / ISO-TP)', 'XCP on CAN', 'K-Line (ISO 9141)', 'SAE J1708', 'UART / RS-485 / RS-232', 'SPI (High-Speed)', 'I2C', 'MODBUS RTU', 'MQTT']
  },
  {
    address: '0x10',
    name: 'DEBUG_INTEG_REG',
    description: 'Hardware bring-up, diagnostics & instrumentation',
    bits: ['Logic Analyzers (Saleae / DSLogic)', 'Digital Storage Oscilloscopes', 'JTAG / SWD (J-Link / ST-LINK)', 'System-Level Fault Analysis', 'Flash Memory Wear Leveling', 'Automated FOTA Validation', 'EMI / ESD Debugging']
  },
  {
    address: '0x14',
    name: 'TOOLCHAIN_IDE_REG',
    description: 'Development toolchains, compilers & engineering software',
    bits: ['Renesas e² studio', 'STM32CubeIDE / CubeMX', 'Keil µVision', 'VS Code', 'Git / GitHub', 'MATLAB / Simulink', 'ROS (Robot OS)', 'AutoCAD']
  },
  {
    address: '0x18',
    name: 'WORKFLOW_ENV_REG',
    description: 'Operating environments, CI/CD & collaboration',
    bits: ['Linux (Ubuntu / Debian)', 'Windows', 'Jira / Confluence', 'Agile / Scrum', 'Peer Code Review', 'Hardware Homologation Support']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    period: 'Sep 2022 – Dec 2023',
    degree: 'Postgraduate Certificate, Intelligent Robotics',
    institution: 'University of York',
    location: 'York, United Kingdom',
    details: 'Comprehensive study of autonomous robot architectures, ROS integration, computer vision, control theory, and embedded sensory perception.',
    highlights: ['Autonomous Robotic Car with obstacle avoidance', 'Multi-axis Robotic Arm trajectory control', 'Search & Rescue Mobile Robot test platform using ROS']
  },
  {
    period: 'Jul 2016 – Nov 2020',
    degree: 'B.E., Electronics and Communication Engineering',
    institution: 'Sri Shakthi Institute of Engineering and Technology',
    location: 'Coimbatore, India',
    details: 'Foundation in digital electronic design, microcontrollers, signal processing, communication theory, and embedded systems programming.',
    highlights: ['Capstone Project: Range Extended Electric Vehicle control logic', 'National Runner-Up & Best Performance Award at SAEINDIA REEV competition']
  }
];

export const PUBLICATION = {
  title: 'Automotive Electronic System Controlling the Range Extended Electric Vehicle',
  journal: 'International Journal of Engineering Research & Technology (IJERT)',
  conference: 'ICEECT 2020',
  volume: 'Volume 8, Issue 17',
  year: '2020',
  description: 'Research paper detailing the hardware architecture, embedded state-machine algorithms, and CAN communication protocol designed to orchestrate range-extender internal combustion engines with electric vehicle battery packs.'
};

export const CAN_FRAMES_DEMO: CanFrame[] = [
  {
    id: 'obd-rpm',
    name: 'OBD-II Engine Speed (RPM) Request',
    protocol: 'ISO 15765-4 (CAN 500k 11-bit)',
    arbitrationId: '0x7DF',
    dlc: 8,
    dataBytes: ['02', '01', '0C', 'CC', '00', '00', '00', '00'],
    interpretation: 'Mode 01 PID 0C: Engine RPM request sent to all powertrain ECUs broadcast',
    cycleTimeMs: 100
  },
  {
    id: 'j1939-speed',
    name: 'SAE J1939 Vehicle Speed & Cruise (CCVS)',
    protocol: 'SAE J1939 (250k 29-bit extended)',
    arbitrationId: '0x18FEF100',
    dlc: 8,
    dataBytes: ['F0', '28', '84', '3D', '00', 'FF', 'FF', 'FF'],
    interpretation: 'PGN 65265 (CCVS): Wheel-based Vehicle Speed = 62.5 km/h, Parking brake released',
    cycleTimeMs: 100
  },
  {
    id: 'uds-session',
    name: 'UDS Diagnostic Session Control (Extended)',
    protocol: 'ISO 14229 / UDS',
    arbitrationId: '0x7E0',
    dlc: 8,
    dataBytes: ['02', '10', '03', 'AA', 'AA', 'AA', 'AA', 'AA'],
    interpretation: 'Service 0x10 sub-function 0x03: Request transition into Extended Diagnostic Session for FOTA',
    cycleTimeMs: 50
  },
  {
    id: 'telematics-fota',
    name: 'FOTA Block Transfer Status',
    protocol: 'Proprietary Bootloader Protocol',
    arbitrationId: '0x550',
    dlc: 8,
    dataBytes: ['80', '04', '00', '1A', 'A5', '5A', 'E2', '31'],
    interpretation: 'Firmware Block #0x0400 written OK, CRC32 chunk match, ready for Block #0x0401',
    cycleTimeMs: 20
  }
];
