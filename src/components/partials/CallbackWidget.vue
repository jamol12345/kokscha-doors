<script setup>
import { ref, computed, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isOpen = ref(false);
const fullName = ref("");

const countries = [
  { name: "🇺🇿 Uzbekistan", code: "998", max: 12 },
  { name: "🇷🇺 Russia", code: "7", max: 11 },
  { name: "🇰🇿 Kazakhstan", code: "7", max: 11 },
  { name: "🇰🇬 Kyrgyzstan", code: "996", max: 12 },
  { name: "🇹🇯 Tajikistan", code: "992", max: 12 },
  { name: "🇹🇲 Turkmenistan", code: "993", max: 11 },
  { name: "🇦🇪 UAE", code: "971", max: 12 },
  { name: "🇹🇷 Turkey", code: "90", max: 12 },
];

const selectedCountry = ref(countries[0]);

const rawPhone = ref(selectedCountry.value.code);

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");

const formatPhone = (digits) => {
  const code = selectedCountry.value.code;

  let local = digits.slice(code.length);

  switch (code) {
    // Узбекистан
    case "998": {
      const p1 = local.slice(0, 2);
      const p2 = local.slice(2, 5);
      const p3 = local.slice(5, 7);
      const p4 = local.slice(7, 9);

      let result = `+${code}`;

      if (p1) result += ` (${p1}`;
      if (p1.length === 2) result += ")";
      if (p2) result += ` ${p2}`;
      if (p3) result += `-${p3}`;
      if (p4) result += `-${p4}`;

      return result;
    }

    // Россия / Казахстан
    case "7": {
      const p1 = local.slice(0, 3);
      const p2 = local.slice(3, 6);
      const p3 = local.slice(6, 8);
      const p4 = local.slice(8, 10);

      let result = `+${code}`;

      if (p1) result += ` (${p1}`;
      if (p1.length === 3) result += ")";
      if (p2) result += ` ${p2}`;
      if (p3) result += `-${p3}`;
      if (p4) result += `-${p4}`;

      return result;
    }

    // Остальные страны
    default:
      return "+" + digits;
  }
};

const displayPhone = computed(() => formatPhone(rawPhone.value));

const onCountryChange = () => {
  rawPhone.value = selectedCountry.value.code;
};

const normalizeDigits = (value) => {
  let digits = value.replace(/\D/g, "");

  if (!digits.startsWith(selectedCountry.value.code)) {
    digits =
      selectedCountry.value.code +
      digits.replace(new RegExp("^" + selectedCountry.value.code), "");
  }

  return digits.slice(0, selectedCountry.value.max);
};

const onPhoneInput = (e) => {
  rawPhone.value = normalizeDigits(e.target.value);
};

const openModal = () => {
  isOpen.value = true;
  isSuccess.value = false;
  errorMessage.value = "";
  fullName.value = "";
  rawPhone.value = selectedCountry.value.code;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = "";
};

const submitLead = async () => {
  errorMessage.value = "";

  if (rawPhone.value.length < selectedCountry.value.code.length + 5) {
    errorMessage.value = t("Please enter the full phone number");
    return;
  }

  try {
    isSubmitting.value = true;

    const payload = {
      fullName: fullName.value,
      phone: `+${rawPhone.value}`,
      source: "callback_widget",
      page: window.location.pathname,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error();

    isSuccess.value = true;

    setTimeout(() => {
      closeModal();
    }, 1500);
  } catch {
    errorMessage.value = t("Failed to send the request");
  } finally {
    isSubmitting.value = false;
  }
};

defineExpose({
  openModal,
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <button class="callbackButton" type="button" @click="openModal">
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M21 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 1.08 4.18 2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L7 9.91a16 16 0 0 0 7.09 7.09l1.46-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 21 16.92z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  <transition name="fade">
    <div v-if="isOpen" class="callbackModal" @click="closeModal">
      <div class="callbackCard" @click.stop>
        <button class="callbackClose" type="button" @click="closeModal">
          ×
        </button>

        <h2 class="callbackTitle">
          {{ $t("Do you have any other questions?") }}
        </h2>
        <p class="callbackText">
          {{ $t("Leave your details and we will call you back shortly.") }}
        </p>

        <label class="callbackField">
          <span class="callbackLabel">{{ $t("Country") }}</span>
          <select
            class="callbackInput"
            v-model="selectedCountry"
            @change="onCountryChange"
          >
            <option
              v-for="country in countries"
              :key="country.code + country.name"
              :value="country"
            >
              {{ country.name }} (+{{ country.code }})
            </option>
          </select>
        </label>

        <label class="callbackField">
          <span class="callbackLabel">{{ $t("Full name") }}</span>
          <input
            class="callbackInput"
            type="text"
            autocomplete="name"
            v-model="fullName"
          />
        </label>

        <label class="callbackField">
          <span class="callbackLabel">{{ $t("Phone number") }}</span>
          <input
            class="callbackInput"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            :value="displayPhone"
            @input="onPhoneInput"
          />
        </label>

        <button
          class="callbackSubmit"
          type="button"
          :disabled="isSubmitting"
          @click="submitLead"
        >
          {{ isSubmitting ? $t("Sending...") : $t("Send") }}
        </button>

        <p v-if="errorMessage" class="callbackError">
          {{ errorMessage }}
        </p>

        <p v-if="isSuccess" class="callbackSuccess">
          {{ $t("The application has been sent") }}
        </p>

        <div class="callbackDivider"></div>

        <p class="callbackPolicy">
          {{
            $t(
              "By clicking the “Submit” button, you confirm your consent to the processing of personal data."
            )
          }}
        </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.callbackButton {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1200;
  width: 68px;
  height: 68px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #16a34a, #0f8a3d);
  color: white;
  box-shadow: 0 18px 40px rgba(22, 163, 74, 0.35);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.callbackButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 44px rgba(22, 163, 74, 0.42);
}

.callbackButton svg {
  width: 30px;
  height: 30px;
}

.callbackModal {
  position: fixed;
  inset: 0;
  z-index: 1300;
  background: rgba(17, 24, 39, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.callbackCard {
  position: relative;
  width: 100%;
  max-width: 540px;
  background: white;
  border-radius: 32px;
  padding: 34px 28px 28px;
  box-shadow: 0 30px 80px rgba(17, 24, 39, 0.18);
  text-align: center;
}

.callbackClose {
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: transparent;
  font-size: 42px;
  line-height: 1;
  color: #111827;
  cursor: pointer;
}

.callbackTitle {
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.08;
  font-weight: 800;
  color: #f08a3c;
}

.callbackText {
  margin-top: 14px;
  color: #6b7280;
  font-size: 18px;
  line-height: 1.5;
}

.callbackField {
  display: block;
  margin-top: 18px;
  text-align: left;
}

.callbackLabel {
  display: block;
  margin: 0 6px 8px;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.callbackInput {
  width: 100%;
  height: 60px;
  margin-top: 0;
  border: none;
  outline: none;
  border-radius: 20px;
  background: #f5f5f5;
  padding: 0 22px;
  font-size: 24px;
  color: #111827;
}

.callbackInput::placeholder {
  color: #9ca3af;
}

.callbackSubmit {
  width: 100%;
  height: 58px;
  margin-top: 22px;
  border: none;
  border-radius: 999px;
  background: #f08a3c;
  color: white;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.callbackSubmit:hover {
  transform: translateY(-1px);
}

.callbackSubmit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.callbackDivider {
  height: 1px;
  background: #e5e7eb;
  margin: 28px 0 22px;
}

.callbackPolicy {
  color: #9ca3af;
  line-height: 1.6;
  font-size: 15px;
}

.callbackError {
  margin-top: 12px;
  color: #dc2626;
  font-size: 14px;
}

.callbackSuccess {
  margin-top: 12px;
  color: #16a34a;
  font-size: 14px;
  font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .callbackButton {
    width: 58px;
    height: 58px;
    left: 14px;
    bottom: 14px;
  }

  .callbackCard {
    border-radius: 24px;
    padding: 28px 18px 22px;
  }

  .callbackTitle {
    font-size: 30px;
  }

  .callbackText {
    font-size: 16px;
  }

  .callbackInput {
    height: 58px;
    font-size: 20px;
  }

  .callbackSubmit {
    height: 52px;
    font-size: 20px;
  }
}
</style>
