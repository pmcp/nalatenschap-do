<!-- 1. Get template at random -->
<!-- 2. Get images with max items from template -->
<!-- 3. Get Question -->
<template>
  <section class="container">

    <div>
      <pre>{{ question }} </pre>
      <pre><h1>{{ question.text }}</h1></pre>


      <pre>
        {{ activeImagePath }}
      </pre>
      <!-- <button
        :disabled="mediaStatus.id === 1"
        @click="next">
        Get next Question
      </button> -->
      <grid :items="media"/>
      <!-- <p>
        {{ question.text }}
      </p>

      <img src="temp/fotografie en eigen werk/GANSBERG KOEKELHOREN/POST-O-MATIC - FOTO'S - 2020/2048/SKM_C36820081716460.jpeg">
      <p
        v-for="(p, key) in media"
        :key="'text'+key"
      >
        {{ key }} : {{ p }}
      </p>
      <div
        v-for="(p, key) in media"
        :key="key">

        <media-item :item="p"/>

      </div>
      Active Template: {{ activeTemplate }}

      <LazyTemplateOne v-if="activeTemplate === 1" />
      <LazyTemplateTwo v-if="activeTemplate === 2" /> -->
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  components: {
    Logo
  },
  computed: {
    activeTemplate() {
      return this.$store.state.templates.active
    },
    activeImagePath() {
      return this.$store.state.media.activePath
    },
    media() {
      return this.$store.state.media.all
    },
    mediaStatus() {
      return this.$store.state.media.status[
        this.$store.state.media.activeStatus
      ]
    },
    availableQuestions() {
      return this.$store.state.questions.list.filter(item => !item.used)
    },
    question() {
      console.log(
        this.availableQuestions.length,
        this.$store.state.questions.activeQuestion
      )
      if (this.availableQuestions.length === 0)
        return 'Ik heb geen vragen meer.'
      return this.availableQuestions[this.$store.state.questions.activeQuestion]
    }
  },
  // async fetch() {
  //   this.setRandomTemplate()
  // },
  // fetchOnServer: true,
  mounted() {
    this.setRandomTemplate()
  },
  methods: {
    next() {
      this.nextQuestion()
      this.setRandomTemplate()
    },

    ...mapActions({
      getFolders: 'media/getFolders',
      setRandomTemplate: 'templates/setRandomTemplate'
    }),
    nextQuestion() {
      if (this.availableQuestions.length === 0) return
      const activeQuestion = this.$store.state.questions.activeQuestion
      this.setUsedQuestion(activeQuestion)
      this.setNextQuestion(this.availableQuestions.length)
    },
    ...mapMutations({
      getRandomMedia: 'media/getMedia',
      setUsedQuestion: 'questions/setUsed',
      setNextQuestion: 'questions/setNextQuestion'
    })
    // ...mapMutations({
    //   getRandomMedia: 'media/getRandom'
    // })
  }
  // middleware: 'webdav'
}
</script>
