<template>
<div class="box">
  <div class="big-button" @click="$emit('click')">
    <div class="big-plus">+</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddAnswerButton',
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.box {
  padding: 1rem 8px;
  margin-top: -1rem;
}

.big-button {
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
  //box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.5);
  background: $add_button-light-colour;
  padding: 0rem 8px;
}

.big-plus {
  font-weight: 800;
  color: #FFFFFF;
  font-size: 3rem;
  text-align: center;
  user-select: none;
}
</style>
