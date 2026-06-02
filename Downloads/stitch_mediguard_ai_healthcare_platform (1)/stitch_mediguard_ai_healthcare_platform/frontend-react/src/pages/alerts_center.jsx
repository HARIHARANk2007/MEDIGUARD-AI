import React from 'react'

const html = `
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col md:flex-row">
<!-- Navigation Drawer (Desktop) / Hidden Mobile -->
<aside class="hidden md:flex flex-col h-full w-72 fixed left-0 top-0 bg-surface border-r border-surface-container-low shadow-sm z-50 p-base space-y-2">
<div class="px-4 py-6">
<h1 class="font-display-lg text-headline-md font-bold text-primary">MediGuard AI</h1>
</div>
<div class="flex items-center space-x-3 px-4 py-3 mb-6 bg-surface-container-low rounded-xl">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline-md">SC</div>
<div>
<div class="font-headline-md text-body-md text-on-surface">Dr. Sarah Chen</div>
<div class="font-body-sm text-body-sm text-on-surface-variant">Chief Resident</div>
</div>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined mr-3">dashboard</span>
<span class="font-body-md text-body-md">Dashboard</span>
</a>
<a class="flex items-center px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined mr-3" style="font-variation-settings: 'FILL' 1;">troubleshoot</span>
<span class="font-body-md text-body-md">Checker</span>
</a>
<a class="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined mr-3">group</span>
<span class="font-body-md text-body-md">Patients</span>
</a>
<a class="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined mr-3">assessment</span>
<span class="font-body-md text-body-md">Reports</span>
</a>
<a class="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined mr-3">settings</span>
<span class="font-body-md text-body-md">Settings</span>
</a>
</nav>
<a class="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out mt-auto" href="#">
<span class="material-symbols-outlined mr-3">help</span>
<span class="font-body-md text-body-md">Help</span>
</a>
</aside>
<!-- Top App Bar (Mobile) -->
<header class="md:hidden w-full top-0 sticky bg-surface border-b border-outline-variant flex items-center justify-between px-margin-mobile py-base z-50">
<button class="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full active:opacity-80 transition-all">
<span class="material-symbols-outlined">menu</span>
</button>
<h1 class="font-display-lg text-headline-md-mobile font-bold text-primary">MediGuard AI</h1>
<button class="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full active:opacity-80 transition-all">
<span class="material-symbols-outlined">notifications</span>
</button>
</header>
<!-- Main Content -->
<main class="flex-1 md:ml-72 p-margin-mobile md:p-margin-desktop bg-surface-container-low min-h-screen">
<div class="max-w-4xl mx-auto">
<!-- Header -->
<div class="flex justify-between items-end mb-8 border-b border-outline-variant pb-4">
<div>
<h2 class="font-headline-lg text-headline-lg text-on-surface">Alerts Center</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Review critical notifications and system warnings.</p>
</div>
<div class="hidden md:flex space-x-2">
<button class="px-4 py-2 border border-outline text-on-surface font-label-md text-label-md rounded hover:bg-surface-variant transition-colors">Filter</button>
<button class="px-4 py-2 bg-surface text-on-surface font-label-md text-label-md rounded border border-outline hover:bg-surface-variant transition-colors">Mark All Read</button>
</div>
</div>
<!-- Alerts Stack -->
<div class="space-y-4">
<!-- Severe Interaction Alert -->
<div class="bg-surface rounded-xl border border-error-container shadow-sm overflow-hidden flex flex-col md:flex-row">
<div class="bg-error-container w-full md:w-2 flex-shrink-0 h-2 md:h-auto"></div>
<div class="p-4 md:p-6 flex-1">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-2">
<span class="material-symbols-outlined text-error" style="font-variation-settings: 'FILL' 1;">warning</span>
<span class="bg-error text-on-error font-label-md text-label-md px-2 py-0.5 rounded">SEVERE</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">Just now</span>
</div>
<button class="text-on-surface-variant hover:bg-surface-variant p-1 rounded-full"><span class="material-symbols-outlined">more_vert</span></button>
</div>
<h3 class="font-headline-md text-body-lg text-on-surface font-bold mb-2">Critical Interaction: Warfarin &amp; Amiodarone</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4">Patient ID: 8492-A. High risk of bleeding detected. Co-administration significantly increases INR. Immediate review recommended.</p>
<div class="flex flex-wrap gap-2">
<button class="bg-error text-on-error px-4 py-2 rounded font-label-md text-label-md hover:opacity-90 transition-opacity">View Details</button>
<button class="border border-outline text-on-surface px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">Acknowledge</button>
</div>
</div>
</div>
<!-- New Safety Warning -->
<div class="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col md:flex-row">
<div class="bg-secondary-container w-full md:w-2 flex-shrink-0 h-2 md:h-auto"></div>
<div class="p-4 md:p-6 flex-1">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-2">
<span class="material-symbols-outlined text-on-secondary-container" style="font-variation-settings: 'FILL' 1;">info</span>
<span class="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-2 py-0.5 rounded">WARNING</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">2 hrs ago</span>
</div>
<button class="text-on-surface-variant hover:bg-surface-variant p-1 rounded-full"><span class="material-symbols-outlined">more_vert</span></button>
</div>
<h3 class="font-headline-md text-body-lg text-on-surface font-bold mb-2">Updated FDA Guidelines: Metformin</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4">New dosing recommendations for patients with moderate renal impairment (eGFR 30-45 mL/min/1.73m²).</p>
<div class="flex flex-wrap gap-2">
<button class="border border-outline text-on-surface px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">Read Guidelines</button>
<button class="text-on-surface-variant px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">Dismiss</button>
</div>
</div>
</div>
<!-- Medication Reminder -->
<div class="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col md:flex-row opacity-80">
<div class="bg-surface-variant w-full md:w-2 flex-shrink-0 h-2 md:h-auto"></div>
<div class="p-4 md:p-6 flex-1">
<div class="flex justify-between items-start mb-2">
<div class="flex items-center space-x-2">
<span class="material-symbols-outlined text-on-surface-variant">notifications</span>
<span class="bg-surface-variant text-on-surface-variant font-label-md text-label-md px-2 py-0.5 rounded">ROUTINE</span>
<span class="font-data-mono text-data-mono text-on-surface-variant">5 hrs ago</span>
</div>
<button class="text-on-surface-variant hover:bg-surface-variant p-1 rounded-full"><span class="material-symbols-outlined">more_vert</span></button>
</div>
<h3 class="font-headline-md text-body-lg text-on-surface font-bold mb-2">Review Pending Approvals</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-4">You have 4 prescription renewals awaiting authorization for Dr. Smith's queue.</p>
<div class="flex flex-wrap gap-2">
<button class="text-primary px-4 py-2 rounded font-label-md text-label-md hover:bg-primary-fixed transition-colors">Go to Queue</button>
<button class="text-on-surface-variant px-4 py-2 rounded font-label-md text-label-md hover:bg-surface-variant transition-colors">Mark Read</button>
</div>
</div>
</div>
</div>
</main>
</body>
`

export default function AlertsCenter(){
  return <div dangerouslySetInnerHTML={{__html: html}} />
}
