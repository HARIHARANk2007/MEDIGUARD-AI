import React from 'react'

const html = `
<body class="bg-background text-on-surface font-body-md text-body-md antialiased overflow-x-hidden flex h-screen">
<!-- NavigationDrawer (Sidebar) - Hidden on mobile, flex on md+ -->
<aside class="hidden md:flex flex-col h-full w-72 fixed left-0 top-0 bg-surface z-40 border-r border-outline-variant shadow-sm transition-all duration-200 ease-in-out p-base space-y-2">
<!-- Drawer Header: Profile -->
<div class="flex flex-col items-start px-4 py-6 border-b border-surface-container-low mb-4">
<div class="h-16 w-16 rounded-full overflow-hidden border-2 border-primary-fixed mb-4">
<img alt="Dr. Sarah Chen profile" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAftAnlTnOUq2FcicdrjXIatOuu5SbIRXh9cADUN0adqYZ-PSHI2SfhVRSPirid9GunOwtnnKSOc9huS6nOXl2SXorP_1kywm6T51xgcEoV3rubQIVQXcwfWD4u-8P1mwsFjFVctdQOM2F6QqhFsjxxkRq5wSw9_w4lHFOApIUPjaBmPizlPHVDf0Hrab95kDEcrnKEg6-iQ9Hr7W9JDjC63ZpAgg0pWMcVIFbwdOIoHd7Z2oQ8Rtu7CYtIplAF_trJV65BCp2yj4k"/>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface">Dr. Sarah Chen</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Chief Resident</p>
<p class="font-label-md text-label-md text-outline mt-1 uppercase tracking-wider">Hospital ID: 8829</p>
</div>
<!-- Navigation Links -->
<nav class="flex-1 flex flex-col space-y-1 px-2">
<!-- Active Tab: Dashboard -->
<a class="flex items-center gap-4 px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-xl hover:bg-primary-container transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined fill text-[24px]">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[24px]">troubleshoot</span>
<span>Checker</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[24px]">group</span>
<span>Patients</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[24px]">assessment</span>
<span>Reports</span>
</a>
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined text-[24px]">settings</span>
<span>Settings</span>
</a>
<div class="flex-1"></div> <!-- Spacer -->
<a class="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors duration-200 ease-in-out mb-4" href="#">
<span class="material-symbols-outlined text-[24px]">help</span>
<span>Help</span>
</a>
</nav>
</aside>
<!-- Main Content Wrapper -->
<div class="flex-1 flex flex-col min-h-screen md:ml-72 w-full transition-all">
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface flex items-center justify-between px-margin-mobile md:px-margin-desktop py-base border-b border-outline-variant flat no shadows z-30 h-16">
<div class="flex items-center gap-4">
<button class="md:hidden p-2 text-primary active:opacity-80 transition-all hover:bg-surface-container rounded-full flex items-center justify-center">
<span class="material-symbols-outlined">menu</span>
</button>
<h1 class="font-display-lg text-headline-md-mobile md:text-headline-md font-bold text-primary tracking-tight">MediGuard AI</h1>
</div>
<div class="flex items-center">
<button class="p-2 text-primary hover:bg-surface-container transition-colors rounded-full flex items-center justify-center relative active:opacity-80">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
</button>
</div>
</header>
<!-- Main Dashboard Canvas -->
<main class="flex-1 p-margin-mobile md:p-margin-desktop bg-background overflow-y-auto">
<div class="max-w-container-max mx-auto space-y-gutter">
<!-- Welcome Section & Quick Actions Bento -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Greeting -->
<div class="md:col-span-8 flex flex-col justify-center space-y-2">
<h2 class="font-headline-lg text-headline-lg text-on-surface">Overview</h2>
<p class="font-body-md text-body-md text-on-surface-variant">System status is optimal. Review recent high-risk alerts.</p>
</div>
<!-- Quick Actions Panel (Bento Item) -->
<div class="md:col-span-4 flex flex-col gap-3 justify-center">
<button class="w-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary font-label-md text-label-md px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-sm border border-secondary/20">
<span class="material-symbols-outlined text-[20px] fill">science</span>
                            START NEW CHECK
                        </button>
<button class="w-full bg-surface border border-primary text-primary hover:bg-primary-fixed hover:text-on-primary-fixed font-label-md text-label-md px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200">
<span class="material-symbols-outlined text-[20px]">person_search</span>
                            VIEW PATIENT PROFILES
                        </button>
</div>
</section>
<!-- Key Metrics Grid -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-8">
<!-- Metric Card: Total Analyses -->
<div class="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col justify-between transition-shadow hover:shadow-sm">
<div class="flex items-center justify-between mb-4">
<h3 class="font-data-mono text-data-mono text-on-surface-variant uppercase tracking-wider">Total Analyses</h3>
<div class="p-2 bg-surface-container rounded-lg">
<span class="material-symbols-outlined text-primary">fact_check</span>
</div>
</div>
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-on-surface">1,240</span>
<span class="font-body-sm text-body-sm text-secondary flex items-center">
<span class="material-symbols-outlined text-[16px]">arrow_upward</span> 12%
                            </span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-2">Past 30 days</p>
</div>
<!-- Metric Card: High-Risk Detected (Semantic Red / Alert) -->
<div class="bg-error-container/20 border border-error/30 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
<!-- Subtle red gradient background for alert emphasis without breaking minimalism -->
<div class="absolute inset-0 bg-gradient-to-br from-error-container/30 to-transparent pointer-events-none"></div>
<div class="flex items-center justify-between mb-4 relative z-10">
<h3 class="font-data-mono text-data-mono text-on-error-container uppercase tracking-wider font-semibold">High-Risk Detected</h3>
<div class="p-2 bg-error text-on-error rounded-lg">
<span class="material-symbols-outlined fill">warning</span>
</div>
</div>
<div class="flex items-baseline gap-2 relative z-10">
<span class="font-display-lg text-display-lg text-on-error-container">12</span>
<span class="font-label-md text-label-md text-error px-2 py-1 bg-error-container rounded-md">Requires Action</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2 relative z-10">Pending clinician review</p>
</div>
<!-- Metric Card: Saved Reports -->
<div class="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col justify-between transition-shadow hover:shadow-sm">
<div class="flex items-center justify-between mb-4">
<h3 class="font-data-mono text-data-mono text-on-surface-variant uppercase tracking-wider">Saved Reports</h3>
<div class="p-2 bg-surface-container rounded-lg">
<span class="material-symbols-outlined text-secondary">folder_special</span>
</div>
</div>
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-on-surface">45</span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-2">Ready for export</p>
</div>
</section>
<!-- Recent Activity Timeline (Bento Wide Panel) -->
<section class="bg-surface border border-outline-variant rounded-xl overflow-hidden mt-8">
<!-- Card Header - Subtly tinted -->
<div class="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex justify-between items-center">
<h3 class="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface">Recent Interaction Checks</h3>
<button class="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors flex items-center gap-1">
                            VIEW ALL <span class="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
<!-- Timeline Content -->
<div class="p-6">
<div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-outline-variant">
<!-- Timeline Item 1: Severe -->
<div class="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
<!-- Marker -->
<div class="flex items-center justify-center w-10 h-10 rounded-full bg-error text-on-error border-4 border-surface shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative left-0 md:left-1/2 md:-ml-5">
<span class="material-symbols-outlined text-[20px] fill">warning</span>
</div>
<!-- Content -->
<div class="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-error/40 bg-error-container/10 ml-4 md:ml-0 shadow-sm transition-all hover:bg-error-container/20">
<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
<h4 class="font-data-mono text-data-mono font-bold text-on-surface">Warfarin + Amiodarone</h4>
<span class="font-label-md text-label-md px-2 py-1 bg-error text-on-error rounded uppercase tracking-wider shrink-0">Severe</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">Significant increase in INR detected. High risk of bleeding events. Dosage adjustment urgently required.</p>
<div class="flex items-center gap-2 font-label-md text-label-md text-outline">
<span class="material-symbols-outlined text-[16px]">schedule</span> 10 mins ago • Pt. ID: 4920A
                                    </div>
</div>
</div>
<!-- Timeline Item 2: Moderate -->
<div class="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
<!-- Marker -->
<div class="flex items-center justify-center w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container border-4 border-surface shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative left-0 md:left-1/2 md:-ml-5">
<span class="material-symbols-outlined text-[20px]">info</span>
</div>
<!-- Content -->
<div class="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-outline-variant bg-surface-container-lowest ml-4 md:ml-0 shadow-sm transition-all hover:bg-surface-container-low">
<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
<h4 class="font-data-mono text-data-mono font-bold text-on-surface">Lisinopril + Ibuprofen</h4>
<span class="font-label-md text-label-md px-2 py-1 bg-surface-variant text-on-surface-variant rounded uppercase tracking-wider shrink-0 border border-outline/30">Moderate</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">Potential reduction in antihypertensive efficacy. Monitor blood pressure routinely.</p>
<div class="flex items-center gap-2 font-label-md text-label-md text-outline">
<span class="material-symbols-outlined text-[16px]">schedule</span> 45 mins ago • Pt. ID: 8812C
                                    </div>
</div>
</div>
<!-- Timeline Item 3: Minor/Safe -->
<div class="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
<!-- Marker -->
<div class="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-primary border-4 border-surface shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative left-0 md:left-1/2 md:-ml-5">
<span class="material-symbols-outlined text-[20px] fill">check_circle</span>
</div>
<!-- Content -->
<div class="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-outline-variant/50 bg-surface ml-4 md:ml-0 transition-all hover:bg-surface-container-lowest">
<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
<h4 class="font-data-mono text-data-mono font-bold text-on-surface">Amoxicillin + Acetaminophen</h4>
<span class="font-label-md text-label-md px-2 py-1 bg-surface text-outline rounded uppercase tracking-wider shrink-0 border border-outline/20">Minor</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">No significant interactions identified. Standard dosing applies.</p>
<div class="flex items-center gap-2 font-label-md text-label-md text-outline">
<span class="material-symbols-outlined text-[16px]">schedule</span> 2 hrs ago • Pt. ID: 1093B
                                    </div>
</div>
</div>
</div>
</div>
</section>
<!-- Bottom Spacing for mobile to not hug the screen edge too tightly if scrolled -->
<div class="h-12 w-full"></div>
</main>
</div>
</body>
`

export default function ClinicianDashboard(){
  return <div dangerouslySetInnerHTML={{__html: html}} />
}
