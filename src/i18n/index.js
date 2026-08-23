import {createI18n} from "vue-i18n";
import {useCookies} from "@vueuse/integrations/useCookies";

const cookies = useCookies(['locale'])
export async function loadLocales(locales) {
    return await locales.reduce(async (accPromise, locale) => {
        const acc = await accPromise;
        const content = await import(`./locales/${locale.file}.json`);
        acc[locale.code] = content.default || content;
        return acc;
    }, Promise.resolve({}));
}

const i18n = createI18n({
    allowComposition: true,
    legacy: false,
    locale: cookies.get('locale') || 'uz',
    fallbackLocale: 'uz'
});

export default i18n
