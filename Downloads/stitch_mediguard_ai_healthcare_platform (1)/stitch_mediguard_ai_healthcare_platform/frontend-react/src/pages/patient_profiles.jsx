import React from 'react'

const html = `
<body class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col md:flex-row">
<!-- TopAppBar (Mobile Only) -->
<header class="md:hidden w-full top-0 sticky bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline z-50">
<div class="flex items-center justify-between px-margin-mobile py-base w-full">
<div class="flex items-center gap-3">
<button class="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full active:opacity-80 transition-all">
<span class="material-symbols-outlined">menu</span>
</button>
<span class="font-display-lg text-headline-md-mobile font-bold text-primary dark:text-primary-fixed">MediGuard AI</span>
</div>
<button class="text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full active:opacity-80 transition-all">
<span class="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<!-- NavigationDrawer (Desktop Only) -->
<nav class="hidden md:flex h-full w-72 fixed left-0 top-0 bg-surface dark:bg-inverse-surface shadow-sm dark:shadow-none flex-col p-base space-y-2 z-40">
<div class="px-4 py-6 mb-4">
<span class="font-display-lg text-headline-md font-bold text-primary dark:text-primary-fixed">MediGuard AI</span>
</div>
<div class="flex items-center gap-3 px-4 py-3 mb-6">
<img alt="Medical Practitioner Avatar" class="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrmuroeRHVlsjYJb4dZ-uzp-IQ3K4qj8l_a970IS5daE8J3eko5_NVUjv5INwZgPY1Yci90334iKgAgFQK3tt0zTnAgvZ-dpG59hJ0pUGAequZOEfa2ZfUAW2WcS4xFjsjGw4sCot35QFCkDlSpkSSHfyR5j5-HeT3mi6tDxrfsb58LeKys-KV_0mdtJeZhZcWko9tia5j4FAreZC_BpPyoLB9fqF95xra1Fj1Ri_y-ohJwIpTQ5Vd4SYSgEYjK8cI_4Vwny956Y"/>
<div>
<p class="font-headline-md text-[14px] leading-tight font-bold text-primary">Dr. Sarah Chen</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Chief Resident</p>
<p class="font-data-mono text-[10px] text-outline">Hospital ID: 8829</p>
</div>
</div>
<div class="flex-1 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant dark:hover:bg-on-surface-variant rounded-xl duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-body-md text-body-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant dark:hover:bg-on-surface-variant rounded-xl duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">troubleshoot</span>
<span class="font-body-md text-body-md">Checker</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary font-bold rounded-xl duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">group</span>
<span class="font-body-md text-body-md">Patients</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant dark:hover:bg-on-surface-variant rounded-xl duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">assessment</span>
<span class="font-body-md text-body-md">Reports</span>
</a>
</div>
<div class="mt-auto space-y-1 pt-4 border-t border-surface-container-high">
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant dark:hover:bg-on-surface-variant rounded-xl duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-md text-body-md">Settings</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant dark:hover:bg-on-surface-variant rounded-xl duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-body-md text-body-md">Help</span>
</a>
</div>
</nav>
<!-- Main Content -->
<main class="flex-1 md:ml-72 p-margin-mobile md:p-margin-desktop bg-surface-container-low min-h-screen">
<div class="max-w-container-max mx-auto">
<!-- Header Section -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
<div>
<h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Patient Profiles</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Manage and review clinical patient data.</p>
</div>
<button class="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-colors duration-200" onclick="document.getElementById('createProfileModal').classList.remove('hidden')">
<span class="material-symbols-outlined">person_add</span>
                    Create Profile
                </button>
</div>
<!-- Search and Filter -->
<div class="flex flex-col md:flex-row gap-4 mb-8">
<div class="relative flex-1">
<span class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface placeholder-outline transition-shadow" placeholder="Search by name or ID..." type="text"/>
</div>
<button class="px-4 py-2 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant flex items-center gap-2 hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined">filter_list</span>
                    Filter
                </button>
</div>
<!-- Patient Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
<!-- Patient Card 1 -->
<div class="bg-surface border border-outline-variant rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-200">
<div class="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-headline-md text-body-md">EJ</div>
<div>
<h3 class="font-headline-md text-body-md text-on-surface leading-tight">Eleanor James</h3>
<p class="font-data-mono text-label-md text-on-surface-variant">ID: PT-8924</p>
</div>
</div>
<button class="text-on-surface-variant hover:bg-surface-container p-1 rounded-full transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div class="p-4">
<div class="grid grid-cols-2 gap-4 mb-4">
<div>
<p class="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">Age/Gender</p>
<p class="font-body-md text-body-sm text-on-surface">68 F</p>
</div>
<div>
<p class="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">Weight</p>
<p class="font-body-md text-body-sm text-on-surface">64 kg</p>
</div>
</div>
<div>
<p class="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">Active Conditions</p>
<div class="flex flex-wrap gap-2">
<span class="px-2 py-1 bg-error-container text-on-error-container rounded-md font-body-sm text-label-md border border-error/20">Hypertension</span>
<span class="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md font-body-sm text-label-md border border-outline-variant">Type 2 Diabetes</span>
</div>
</div>
</div>
<div class="px-4 py-3 bg-surface-container-lowest border-t border-outline-variant flex justify-end gap-2">
<button class="px-3 py-1.5 text-on-surface-variant hover:bg-surface-container rounded-md font-label-md text-label-md transition-colors">Edit</button>
<button class="px-3 py-1.5 text-primary hover:bg-primary-fixed rounded-md font-label-md text-label-md transition-colors">Review</button>
</div>
</div>
<!-- Patient Card 2 -->
<div class="bg-surface border border-outline-variant rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-200">
<div class="bg-surface-container-low px-4 py-3 border-b border-outline-variant flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-headline-md text-body-md">MR</div>
<div>
<h3 class="font-headline-md text-body-md text-on-surface leading-tight">Marcus Reed</h3>
<p class="font-data-mono text-label-md text-on-surface-variant">ID: PT-3319</p>
</div>
</div>
<button class="text-on-surface-variant hover:bg-surface-container p-1 rounded-full transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div class="p-4">
<div class="grid grid-cols-2 gap-4 mb-4">
<div>
<p class="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">Age/Gender</p>
<p class="font-body-md text-body-sm text-on-surface">45 M</p>
</div>
<div>
<p class="font-label-md text-label-md text-outline mb-1 uppercase tracking-wider">Weight</p>
<p class="font-body-md text-body-sm text-on-surface">82 kg</p>
</div>
</div>
<div>
<p class="font-label-md text-label-md text-outline mb-2 uppercase tracking-wider">Active Conditions</p>
<div class="flex flex-wrap gap-2">
<span class="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md font-body-sm text-label-md border border-outline-variant">Asthma</span>
</div>
</div>
</div>
<div class="px-4 py-3 bg-surface-container-lowest border-t border-outline-variant flex justify-end gap-2">
<button class="px-3 py-1.5 text-on-surface-variant hover:bg-surface-container rounded-md font-label-md text-label-md transition-colors">Edit</button>
<button class="px-3 py-1.5 text-primary hover:bg-primary-fixed rounded-md font-label-md text-label-md transition-colors">Review</button>
</div>
</div>
</div>
</div>
</main>
<!-- Create Profile Modal (Hidden by default) -->
<div class="hidden fixed inset-0 z-50 flex items-center justify-center bg-on-surface/20 backdrop-blur-sm p-4" id="createProfileModal">
<div class="bg-surface w-full max-w-lg rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-outline-variant flex flex-col max-h-[795px]">
<div class="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low rounded-t-xl">
<h2 class="font-headline-md text-headline-md-mobile text-on-surface">Create Patient Profile</h2>
<button class="text-on-surface-variant hover:bg-surface-container p-1 rounded-full transition-colors" onclick="document.getElementById('createProfileModal').classList.add('hidden')">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<div class="p-6 overflow-y-auto flex-1 space-y-6">
<!-- Form Fields -->
<div>
<label class="block font-label-md text-label-md text-on-surface mb-2">Full Name</label>
<input class="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface placeholder-outline transition-shadow" placeholder="e.g. Jane Doe" type="text"/>
</div>
<div class="grid grid-cols-2 gap-4">
<div>
<label class="block font-label-md text-label-md text-on-surface mb-2">Age</label>
<input class="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface placeholder-outline transition-shadow" placeholder="Years" type="number"/>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface mb-2">Gender</label>
<select class="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface transition-shadow">
<option>Select</option>
<option>Female</option>
<option>Male</option>
<option>Other</option>
</select>
</div>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface mb-2">Weight (kg)</label>
<input class="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface placeholder-outline transition-shadow" placeholder="e.g. 70" type="number"/>
</div>
<div>
<label class="block font-label-md text-label-md text-on-surface mb-2">Medical Conditions</label>
<div class="relative">
<input class="w-full pl-3 pr-10 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface placeholder-outline transition-shadow" placeholder="Type and press enter..." type="text"/>
<button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:bg-primary-fixed p-1 rounded-md transition-colors">
<span class="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
<!-- Chips Area -->
<div class="flex flex-wrap gap-2 mt-3 p-3 bg-surface-container-low border border-outline-variant border-dashed rounded-lg min-h-[48px]">
<span class="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md font-body-sm text-label-md border border-outline-variant flex items-center gap-1">
                            Hypertension
                            <span class="material-symbols-outlined text-[14px] cursor-pointer hover:text-error">close</span>
</span>
</div>
</div>
</div>
<div class="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest rounded-b-xl flex justify-end gap-3">
<button class="px-4 py-2 text-on-surface border border-outline-variant hover:bg-surface-container rounded-lg font-label-md text-label-md transition-colors" onclick="document.getElementById('createProfileModal').classList.add('hidden')">Cancel</button>
<button class="px-4 py-2 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors">Save Profile</button>
</div>
</div>
</div>
</body>
`

export default function PatientProfiles(){
  return <div dangerouslySetInnerHTML={{__html: html}} />
}
