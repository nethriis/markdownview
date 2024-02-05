<template>
  <div
    class="flex items-center justify-center max-h-[calc(100vh-65px)] h-[calc(100vh-65px)]"
  >
    <div class="lg:max-w-2xl max-w-xl flex flex-col space-y-6 px-4">
      <h1
        class="text-center text-gray-900 dark:text-white text-3xl sm:text-5xl md:text-7xl font-bold"
      >
        Documentation creation is simple
      </h1>
      <p
        class="text-center text-base sm:text-lg text-gray-400 dark:text-gray-500"
      >
        Transform your ideas into polished docs with ease. Our app simplifies
        Markdown editing, making it quick to draft, preview, and share your
        work. Perfect for READMEs and notes.
      </p>
      <div class="flex justify-center w-full space-x-6">
        <UButton size="xl" icon="ri:rocket-line" to="/editor"
          >Get Started</UButton
        >
        <UButton
          variant="outline"
          size="xl"
          icon="ri:heart-line"
          to="https://github.com/sponsors/nethriis"
          target="_blank"
          >Support</UButton
        >
      </div>
    </div>
    <svg
      class="absolute inset-x-0 top-16 -z-10 h-[calc(100vh-65px)] w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] dark:[mask-image:radial-gradient(32rem_32rem_at_center,gray-900,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none"></path>
        </pattern>
      </defs>
      <svg
        x="50%"
        y="-1"
        class="overflow-visible fill-gray-50 dark:fill-gray-800"
      >
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0"
        ></path>
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
      ></rect>
    </svg>
  </div>
</template>
