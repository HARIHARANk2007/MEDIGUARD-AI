import React from 'react'

const html = `
<body class="bg-surface-container-low min-h-screen flex items-center justify-center p-margin-mobile antialiased">
<!-- Login Container -->
<main class="w-full max-w-[400px] flex flex-col items-center">
<!-- Brand / Header -->
<div class="mb-8 flex flex-col items-center text-center">
<div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-sm">
<span class="material-symbols-outlined text-on-primary text-2xl" style="font-variation-settings: 'FILL' 1;">shield_person</span>
</div>
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">MediGuard AI</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant">Secure authentication for medical personnel.</p>
</div>
<!-- Form Card (Level 1 Elevation) -->
<div class="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]">
<form action="#" class="space-y-5" method="POST">
<!-- Email Input -->
<div class="space-y-1.5">
<label class="block font-label-md text-label-md text-on-surface" for="email">Hospital Email</label>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline text-[20px]">mail</span>
</div>
<input class="block w-full pl-10 pr-3 py-2.5 font-body-md text-body-md bg-surface border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" id="email" name="email" placeholder="dr.smith@hospital.org" required type="email"/>
</div>
</div>
<!-- Password Input -->
<div class="space-y-1.5">
<div class="flex items-center justify-between">
<label class="block font-label-md text-label-md text-on-surface" for="password">Password</label>
<a class="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="#">Forgot Password?</a>
</div>
<div class="relative">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline text-[20px]">lock</span>
</div>
<input class="block w-full pl-10 pr-3 py-2.5 font-body-md text-body-md bg-surface border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" id="password" name="password" placeholder="••••••••" required type="password"/>
</div>
</div>
<!-- Submit Button -->
<button class="w-full flex items-center justify-center py-2.5 px-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container active:opacity-80 transition-all duration-200 mt-2" type="submit">
                    Access Dashboard
                    <span class="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</button>
</form>
<!-- Divider -->
<div class="mt-6 mb-6 flex items-center text-center">
<div class="flex-1 border-t border-outline-variant"></div>
<span class="px-3 font-body-sm text-body-sm text-outline">or authorize with</span>
<div class="flex-1 border-t border-outline-variant"></div>
</div>
<!-- Social Login Buttons -->
<div class="space-y-3">
<button class="w-full flex items-center justify-center py-2 px-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-colors duration-200" type="button">
<svg class="w-5 h-5 mr-2" fill="currentColor" viewbox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
</svg>
                    Google Workspace
                </button>
<button class="w-full flex items-center justify-center py-2 px-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-colors duration-200" type="button">
<svg class="w-5 h-5 mr-2" fill="currentColor" viewbox="0 0 24 24">
<path clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill-rule="evenodd"></path>
</svg>
                    GitHub SSO
                </button>
</div>
</div>
<!-- Footer Info -->
<div class="mt-8 text-center">
<p class="font-body-sm text-body-sm text-on-surface-variant max-w-[280px]">
                By logging in, you agree to our <a class="text-primary hover:underline" href="#">Terms of Service</a> and <a class="text-primary hover:underline" href="#">Privacy Policy</a>.
            </p>
</div>
</main>
</body>
`

export default function Login(){
  return <div dangerouslySetInnerHTML={{__html: html}} />
}
