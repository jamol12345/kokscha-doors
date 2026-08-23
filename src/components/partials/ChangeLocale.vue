Vue
<script setup>
import { computed } from "vue"
import locales from "@/i18n/locales.json"
import { useCookies } from "@vueuse/integrations/useCookies"
import { watch } from "vue"
import { useI18n } from "vue-i18n"
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown"

const cookies = useCookies(["locale"])
const { locale } = useI18n()

const currentLocale = computed(
  () => locales.find((l) => l.code === locale.value) ?? locales[0]
)

const setLocale = (code) => {
  locale.value = code
}

watch(locale, (value) => {
  cookies.set("locale", value)
  document.documentElement.lang = value
}, { immediate: true })
</script>

<template>
  <Dropdown>
    <DropdownTrigger v-bind="$attrs">
      {{ currentLocale.name }}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </DropdownTrigger>

    <DropdownContent align="end">
      <DropdownItem
        v-for="item in locales"
        :key="item.code"
        @select="setLocale(item.code)"
      >
        <span class="flex-1">{{ item.name }}</span>
        <svg
          v-if="item.code === locale"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </DropdownItem>
    </DropdownContent>
  </Dropdown>
</template>
