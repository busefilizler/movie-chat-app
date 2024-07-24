<template>
  <div class="h-full">

    <div class="flex flex-row w-full h-full justify-between">
      <div class="px-3 w-2/5 h-full">
        <slot name="body" />
      </div>

      <div class="w-3/5 h-full overflow-y-auto">
        <slot name="activity" />
      </div>
    </div>

  </div>
</template>
