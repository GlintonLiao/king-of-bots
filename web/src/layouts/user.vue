<template>
  <main class="px-4 py-5 text-center text-gray-700 dark:text-gray-200">
    <Header />
    <div class="max-w-60vw mx-auto">
      <RouterView />
    </div>
    <div fixed bottom-10 class="footer">
      <Footer />
    </div>
  </main>
</template>

<style>
/* * {
  outline: 1px solid limegreen;
} */
.footer {
  left: 50%;
  transform: translateX(-50%);
}
</style>
