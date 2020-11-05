<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="openEmail(email)"
      >
        <td><input type="checkbox" /></td>
        <td>{{ email.from }}</td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">
          {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
        </td>
        <td><button @click="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @close-modal="openedEmail = null">
    <MailView :email="openedEmail" />
  </ModalView>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import { ref } from 'vue'
import { localhost } from '@/utils.js'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'

export default {
  async setup() {
    let response = await axios.get(localhost.emails)
    let emails = response.data
    return {
      format,
      emails: ref(emails),
      openedEmail: ref(null),
    }
  },
  components: {
    MailView,
    ModalView,
  },
  computed: {
    sortedEmails() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.emails.sort((e1, e2) => {
        return e2.sentAt - e1.sentAt
      })
    },
    unarchivedEmails() {
      return this.sortedEmails.filter((e) => !e.archived)
    },
  },
  methods: {
    openEmail(email) {
      email.read = true
      this.updateEmail(email)
      this.openedEmail = email
    },
    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },
    updateEmail(email) {
      axios.put(localhost.emails + `/${email.id}`, email)
    },
  },
}
</script>

<style scoped></style>
