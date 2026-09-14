import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 16;
const contentWidth = pageWidth - margin * 2;

// Background & Header bar
doc.setFillColor(11, 16, 21); // #0B1015
doc.rect(0, 0, pageWidth, 38, "F");

// Accent line
doc.setDrawColor(232, 163, 61); // #E8A33D
doc.setLineWidth(1.2);
doc.line(0, 38, pageWidth, 38);

// Name & Title
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(20);
doc.text("PRADEEP KUMAR BALASUBRAMANIAN", margin, 16);

doc.setFont("helvetica", "normal");
doc.setFontSize(11);
doc.setTextColor(232, 163, 61); // Gold accent
doc.text("Embedded Software Engineer | Automotive Telematics & RTOS", margin, 24);

// Contact Info Bar
doc.setFontSize(8.5);
doc.setTextColor(190, 205, 218);
doc.text("Pune, India (Open to Relocation)  |  +91 83490 22220  |  pradeepkumarb.official@outlook.com", margin, 32);

let y = 46;

function drawSectionHeader(title) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(16, 23, 30);
  doc.text(title.toUpperCase(), margin, y);
  
  doc.setDrawColor(232, 163, 61);
  doc.setLineWidth(0.6);
  doc.line(margin, y + 1.5, pageWidth - margin, y + 1.5);
  y += 7;
}

// Summary
drawSectionHeader("Professional Summary");
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(40, 50, 60);
const summaryText = "Embedded Software Engineer with 4+ years of experience building production firmware in C/C++ and Python across automotive and industrial systems. Specialized in RTOS-based real-time design, bootloader development, flash memory management, and communication protocol integration (CAN, J1939, UDS ISO 15765-4, MODBUS). Hands-on track record in automotive telematics, ECU diagnostics, FOTA workflows, and IoT device firmware.";
const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
doc.text(splitSummary, margin, y);
y += splitSummary.length * 4.2 + 4;

// Technical Skills
drawSectionHeader("Technical Skills");
doc.setFontSize(8.8);

const skillGroups = [
  { cat: "Programming:", items: "Embedded C, C++, Python, Shell Scripting" },
  { cat: "Platforms & MCUs:", items: "Renesas RA Series, Renesas RH850, ARM Cortex-M (STM32), ESP32, ESP8266, PIC, Quectel EC200" },
  { cat: "RTOS & Architecture:", items: "FreeRTOS, QL_RTOS (QuecOpen), Custom Bootloaders, Flash Memory, Dual-Bank FOTA, ISR" },
  { cat: "Protocols & Bus:", items: "CAN, J1939, UDS (ISO 15765-4), XCP, K-Line, J1708, UART, SPI, I2C, MODBUS, MQTT" },
  { cat: "Tools & Equipment:", items: "Renesas e² studio, STM32CubeIDE, Keil µVision, Logic Analyzers, Oscilloscopes, Git, ROS" }
];

skillGroups.forEach(g => {
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 30, 40);
  doc.text(g.cat, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 80);
  doc.text(g.items, margin + 36, y);
  y += 4.5;
});
y += 3;

// Experience
drawSectionHeader("Work Experience");

function addJob(role, company, location, dates, bullets) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 30);
  doc.text(role, margin, y);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 115, 125);
  const rightText = `${location}  |  ${dates}`;
  const rightWidth = doc.getTextWidth(rightText);
  doc.text(rightText, pageWidth - margin - rightWidth, y);
  y += 4.2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.8);
  doc.setTextColor(180, 115, 20); // Amber hint
  doc.text(company, margin, y);
  y += 4.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(45, 55, 65);

  bullets.forEach(b => {
    doc.text("•", margin + 1, y);
    const splitB = doc.splitTextToSize(b, contentWidth - 6);
    doc.text(splitB, margin + 5, y);
    y += splitB.length * 3.8 + 0.8;
  });
  y += 2.5;
}

addJob(
  "Embedded Systems Engineer",
  "Intangles Lab Pvt Ltd",
  "Pune, India",
  "Aug 2024 – Present",
  [
    "Engineered telematics firmware and custom bootloaders on Renesas RA Series MCUs, implementing flash memory management for backup firmware images, update flags, and persistent configuration data.",
    "Architected Quectel EC200 (QuecOpen / QL_RTOS) firmware managing end-to-end CAN polling, ECU communication, cloud routing, and FOTA workflows.",
    "Integrated and validated automotive communication protocols including CAN, J1939, ISO 15765-4 (UDS), XCP, K-Line, and J1708 for vehicle diagnostics.",
    "Performed system-level debugging, performance optimization, and fault analysis to maximize firmware stability and communication reliability.",
    "Developed a Python-based automation application to orchestrate ECU FOTA validation workflows."
  ]
);

addJob(
  "Embedded Engineer",
  "Nanotronics Scientific Solutions",
  "Coimbatore, India",
  "Jul 2020 – Aug 2022",
  [
    "Developed production-ready embedded firmware for IoT devices, industrial fuel dispensers, and home automation controllers.",
    "Implemented and optimized multi-protocol communication using UART, MODBUS, SPI, and MQTT for deterministic real-time data exchange.",
    "Integrated FreeRTOS, designing deterministic tasks, queues, semaphores, and software timers for responsive system performance.",
    "Supported hardware bring-up, debugging, and production deployment across ESP32, ESP8266, STM32, and PIC platforms."
  ]
);

addJob(
  "Project Intern — Range-Extended EV",
  "SAEINDIA (in collaboration with General Motors)",
  "Bengaluru, India",
  "Jul 2019 – Aug 2019",
  [
    "Led electronics and embedded systems development for a Range-Extended Electric Vehicle (REEV) project with General Motors.",
    "Engineered embedded control logic, sensor interfacing, and vehicle performance validation; awarded Best Performance & Runner-up nationally."
  ]
);

// Education & Publication
drawSectionHeader("Education & Publication");

doc.setFont("helvetica", "bold");
doc.setFontSize(8.8);
doc.setTextColor(20, 30, 40);
doc.text("Postgraduate Certificate, Intelligent Robotics", margin, y);
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(90, 100, 110);
doc.text("University of York, United Kingdom (Sep 2022 – Dec 2023)", margin + 75, y);
y += 4;
doc.setFontSize(8);
doc.setTextColor(70, 80, 90);
doc.text("Key Projects: Autonomous Robotic Car, Robotic Arm manipulation, Rescue Robot with ROS", margin + 4, y);
y += 5.5;

doc.setFont("helvetica", "bold");
doc.setFontSize(8.8);
doc.setTextColor(20, 30, 40);
doc.text("B.E., Electronics & Communication Engineering", margin, y);
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(90, 100, 110);
doc.text("Sri Shakthi Institute of Engineering & Technology, India (2016 – 2020)", margin + 75, y);
y += 4;
doc.setFontSize(8);
doc.setTextColor(70, 80, 90);
doc.text("Key Project: Range-Extended Electric Vehicle embedded powertrain control", margin + 4, y);
y += 6;

doc.setFont("helvetica", "bold");
doc.setFontSize(8.5);
doc.setTextColor(20, 30, 40);
doc.text("Publication:", margin, y);
doc.setFont("helvetica", "italic");
doc.setFontSize(8.2);
doc.setTextColor(60, 70, 80);
const pubText = "Automotive Electronic System Controlling the Range Extended Electric Vehicle — IJERT, ICEECT 2020, Vol 8, Issue 17.";
doc.text(pubText, margin + 22, y);

const outputDir = path.resolve("./public");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfData = doc.output("arraybuffer");
fs.writeFileSync(path.join(outputDir, "PradeepkumarB_EmbeddedsoftwareEngineer.pdf"), Buffer.from(pdfData));
fs.writeFileSync(path.resolve("./PradeepkumarB_EmbeddedsoftwareEngineer.pdf"), Buffer.from(pdfData));
console.log("PDF generated successfully in /public and / root!");
