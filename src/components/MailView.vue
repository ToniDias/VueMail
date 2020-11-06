<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead">
        {{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}
      </button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em
      >
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from 'date-fns'
import marked from 'marked'
// import axios from 'axios'
// import { localhost } from '@/utils.js'
import useKeyDown from '@/composables/use-keydown'

export default {
  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    // const email = props.email
    // let toggleRead = () => {
    //   email.read = !email.read
    //   axios.put(localhost.emails + `/${email.id}`, email)
    // }
    // let toggleArchive = () => {
    //   email.archived = !email.archived
    //   axios.put(localhost.emails + `/${email.id}`, email)
    // }
    let toggleRead = () => {
      emit('change-email', { toggleRead: true, save: true })
    }
    let toggleArchive = () => {
      emit('change-email', {
        toggleArchive: true,
        save: true,
        closeModal: true,
      })
    }
    let goNewer = () => {
      emit('change-email', { changeIndex: -1 })
    }
    let goOlder = () => {
      emit('change-email', { changeIndex: 1 })
    }
    let goNewerAndArchive = () => {
      emit('change-email', { changeIndex: -1, toggleArchive: true, save: true })
    }
    let goOlderAndArchive = () => {
      emit('change-email', { changeIndex: 1, toggleArchive: true, save: true })
    }

    useKeyDown([
      { key: 'r', fn: toggleRead },
      { key: 'e', fn: toggleArchive },
      { key: 'k', fn: goNewer },
      { key: 'j', fn: goOlder },
      { key: '(', fn: goNewerAndArchive },
      { key: ')', fn: goOlderAndArchive },
    ])
    return {
      format,
      marked,
      toggleRead,
      toggleArchive,
      goNewer,
      goOlder,
    }
  },
  props: {
    email: {
      type: Object,
      requierd: true,
    },
  },
}
</script>

<style></style>
