<template>
    <div>
    <app-header />
    <div class="blue-background mx-auto">
      <ilo-dialog title="О проекте">
        <p>
          Используя данное приложение, Вы соглашаетесь с отказом от гарантий ниже:
        </p>
        <p>
          НЕТ НИКАКИХ ГАРАНТИЙ ДЛЯ ПРОГРАММЫ ДО РАМОК, ДОПУСТИМЫХ ДЕЙСТВУЮЩИМ
          ЗАКОНОДАТЕЛЬСТВОМ. ЕСЛИ ИНОЕ НЕ УСТАНОВЛЕНО В ПИСЬМЕННОЙ ФОРМЕ,
          ПРАВООБЛАДАТЕЛЬ И/ИЛИ ДРУГИЕ СТОРОНЫ ПРЕДОСТАВЛЯЮТ ПРОГРАММУ «КАК ЕСТЬ»,
          БЕЗ КАКИХ ЛИБО ГАРАНТИЙ (ЗАЯВЛЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ), ВКЛЮЧАЯ, НО,
          НЕ ОГРАНИЧИВАЯСЬ, ПОДРАЗУМЕВАЕМЫМИ ГАРАНТИЯМИ ТОВАРНОГО СОСТОЯНИЯ ПРИ
          ПРОДАЖЕ И ГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННОГО ПРИМЕНЕНИЯ. ВЕСЬ РИСК, КАК В ОТНОШЕНИИ
          КАЧЕСТВА, ТАК И ПРОИЗВОДИТЕЛЬНОСТИ ПРОГРАММЫ ВЫ БЕРЕТЕ НА СЕБЯ. ЕСЛИ В
          ПРОГРАММЕ ОБНАРУЖЕН ДЕФЕКТ, ВЫ БЕРЕТЕ НА СЕБЯ СТОИМОСТЬ НЕОБХОДИМОГО
          ОБСЛУЖИВАНИЯ, ПОЧИНКИ ИЛИ ИСПРАВЛЕНИЯ.
        </p>
        <p>
          Ilo Ilo (evaluate from Malay language) - приложение для удаленного создания
          тестов и оценки знаний студентов.
        </p>
      </ilo-dialog>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import IloDialog from '../components/Dialog.vue';

export default {
  name: 'About',
  components: {
    AppHeader,
    IloDialog,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

.blue-background {
  background: $main-blue;
  height: 30rem;
}
</style>
