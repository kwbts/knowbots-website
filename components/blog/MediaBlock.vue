<!-- components/blog/MediaBlock.vue -->
<template>
  <div class="media-block my-8">
    <div v-if="value.image" :class="['image-container', getImageDisplayClass(value.image)]">
      <img
        :src="getImageParameters(value.image).url"
        :alt="value.image.alt || 'Blog content image'"
        class="image-responsive"
        ref="imageElement"
      />
      <div v-if="value.caption" class="caption-container">
        <p class="caption-text">{{ value.caption }}</p>
      </div>
    </div>
    <div v-else-if="value.video" class="video-container">
      <iframe
        :src="value.video.url"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full aspect-video rounded-lg"
      ></iframe>
      <div v-if="value.caption" class="caption-container">
        <p class="caption-text">{{ value.caption }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props for the component
const props = defineProps({
  value: {
    type: Object,
    required: true
  },
  getImageDisplayClass: {
    type: Function,
    required: true
  },
  getImageParameters: {
    type: Function,
    required: true
  }
});
</script>

<style>
/* Using non-scoped styles to ensure they override any other styles */
.image-container {
  display: block;
  position: relative;
}

.caption-container {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
}

.caption-text {
  display: block;
  text-align: center !important;
  font-style: italic !important;
  font-size: 0.875rem !important;
  color: #4A4A4A !important;
  margin: 0 auto !important;
  padding: 0 !important;
  width: 100% !important;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 2rem 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
}
</style>