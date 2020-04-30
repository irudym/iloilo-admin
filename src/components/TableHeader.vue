<template>
<div class="row table-header">
  <div v-for="title in header" :key="title.text" :class="title.size">
    {{title.text}}
  </div>
</div>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    header: {
      type: Array,
      default: () => ([{}]),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.table-header {
  margin: 2rem 0 0 0;
  background: $sign_box-colour;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  color:  $title-colour;
  font-weight: 500;
}

</style>
