<template>
  <input
    type="checkbox"
    :checked="allEmailsSelected"
    :class="[someEmailSelected ? 'partial-check' : '']"
    @click="bulkSelect"
  />
</template>

<script>
import useEmailSelection from '@/composables/use-email-selection'
import { computed } from 'vue'
export default {
  setup(props) {
    let emailSelection = useEmailSelection()
    let numberSelected = computed(() => emailSelection.emails.size)
    // eslint-disable-next-line vue/no-setup-props-destructure
    let numberEmails = props.emails.length
    let allEmailsSelected = computed(
      () => numberEmails === numberSelected.value
    )
    let someEmailSelected = computed(
      () => numberSelected.value > 0 && numberSelected.value < numberEmails
    )

    let bulkSelect = () => {
      if (allEmailsSelected.value) {
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }
    return {
      allEmailsSelected,
      someEmailSelected,
      bulkSelect,
    }
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
