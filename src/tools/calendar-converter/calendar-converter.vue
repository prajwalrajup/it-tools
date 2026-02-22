<script setup lang="ts">
import { CalendarConverter } from './calendar-converter.service';

const converter = ref(new CalendarConverter());

const monthOptions = [
  { label: 'January', value: 1 }, { label: 'February', value: 2 },
  { label: 'March', value: 3 }, { label: 'April', value: 4 },
  { label: 'May', value: 5 }, { label: 'June', value: 6 },
  { label: 'July', value: 7 }, { label: 'August', value: 8 },
  { label: 'September', value: 9 }, { label: 'October', value: 10 },
  { label: 'November', value: 11 }, { label: 'December', value: 12 },
];

const hebrewMonths = [
  { label: 'Nisan (נִיסָן)', value: 1 },
  { label: 'Iyyar (אִיָּר)', value: 2 },
  { label: 'Sivan (סִיוָן)', value: 3 },
  { label: 'Tammuz (תַּמּוּז)', value: 4 },
  { label: 'Av (אָב)', value: 5 },
  { label: 'Elul (אֱלוּל)', value: 6 },
  { label: 'Tishri (תִּשְׁרֵי)', value: 7 },
  { label: 'Heshvan (חֶשְׁוָן)', value: 8 },
  { label: 'Kislev (כִּסְלֵו)', value: 9 },
  { label: 'Teveth (טֵבֵת)', value: 10 },
  { label: 'Shevat (שְׁבָט)', value: 11 },
  { label: 'Adar/Adar I (אֲדָר)', value: 12 },
  { label: 'Veadar/Adar II (אֲדָר שֵׁנִי)', value: 13 },
];

const islamicMonths = [
  { label: 'Muharram (مُحَرَّم)', value: 1 },
  { label: 'Safar (صَفَر)', value: 2 },
  { label: 'Rabiʿ al‑Awwal (رَبيع الأوّل)', value: 3 },
  { label: 'Rabiʿ ath‑Thani (رَبيع الثاني)', value: 4 },
  { label: 'Jumada al‑Ula (جُمادى الأولى)', value: 5 },
  { label: 'Jumada ath‑Thania (جُمادى الآخرة)', value: 6 },
  { label: 'Rajab (رَجَب)', value: 7 },
  { label: 'Shaʿban (شَعْبان)', value: 8 },
  { label: 'Ramadan (رَمَضان)', value: 9 },
  { label: 'Shawwal (شَوّال)', value: 10 },
  { label: 'Dhu al‑Qaʿda (ذو القَعْدة)', value: 11 },
  { label: 'Dhu al‑Hijja (ذو الحِجّة)', value: 12 },
];

const persianMonths = [
  { label: 'Farvardin (فروردین)', value: 1 },
  { label: 'Ordibehesht (اردیبهشت)', value: 2 },
  { label: 'Khordad (خرداد)', value: 3 },
  { label: 'Tir (تیر)', value: 4 },
  { label: 'Mordad (مرداد)', value: 5 },
  { label: 'Shahrivar (شهریور)', value: 6 },
  { label: 'Mehr (مهر)', value: 7 },
  { label: 'Aban (آبان)', value: 8 },
  { label: 'Azar (آذر)', value: 9 },
  { label: 'Dey (دی)', value: 10 },
  { label: 'Bahman (بهمن)', value: 11 },
  { label: 'Esfand (اسفند)', value: 12 },
];

const indianMonths = [
  { label: 'Caitra (चैत्र)', value: 1 },
  { label: 'Vaisakha (वैशाख)', value: 2 },
  { label: 'Jyaistha (ज्येष्ठ)', value: 3 },
  { label: 'Asadha (आषाढ़)', value: 4 },
  { label: 'Sravana (श्रावण)', value: 5 },
  { label: 'Bhadra (भाद्रपद)', value: 6 },
  { label: 'Asvina (आश्विन)', value: 7 },
  { label: 'Kartika (कार्तिक)', value: 8 },
  { label: 'Agrahayana (अग्रहायण)', value: 9 },
  { label: 'Pausa (पौष)', value: 10 },
  { label: 'Magha (माघ)', value: 11 },
  { label: 'Phalguna (फाल्गुन)', value: 12 },
];

const frenchMonths = [
  { label: 'Vendémiaire', value: 1 }, { label: 'Brumaire', value: 2 },
  { label: 'Frimaire', value: 3 }, { label: 'Nivôse', value: 4 },
  { label: 'Pluviôse', value: 5 }, { label: 'Ventôse', value: 6 },
  { label: 'Germinal', value: 7 }, { label: 'Floréal', value: 8 },
  { label: 'Prairial', value: 9 }, { label: 'Messidor', value: 10 },
  { label: 'Thermidor', value: 11 }, { label: 'Fructidor', value: 12 },
  { label: 'Sans‑culottides', value: 13 },
];

const frenchDecades = [
  { label: 'I', value: 1 },
  { label: 'II', value: 2 },
  { label: 'III', value: 3 },
];

const frenchDays = [
  { label: 'Primidi (1)', value: 1 }, { label: 'Duodi (2)', value: 2 },
  { label: 'Tridi (3)', value: 3 }, { label: 'Quartidi (4)', value: 4 },
  { label: 'Quintidi (5)', value: 5 }, { label: 'Sextidi (6)', value: 6 },
  { label: 'Septidi (7)', value: 7 }, { label: 'Octidi (8)', value: 8 },
  { label: 'Nonidi (9)', value: 9 }, { label: 'Décadi (10)', value: 10 },
  { label: 'Vertu (1)', value: 12 }, { label: 'Génie (2)', value: 13 },
  { label: 'Travail (3)', value: 14 }, { label: 'Opinion (4)', value: 15 },
  { label: 'Récompenses (5)', value: 16 }, { label: 'Révolution (6)', value: 17 },
];
</script>

<template>
  <div>
    <n-p>
      This is a port of wonderful <c-link target="_blank" href="https://www.fourmilab.ch/documents/calendar">
        Fourmilab.ch Calendar converter
      </c-link> by John Walker
    </n-p>
    <n-tabs type="line" animated>
      <!-- Gregorian -->
      <n-tab-pane name="gregorian" tab="Gregorian">
        <n-form :model="converter.document.gregorian" label-placement="left">
          <n-form-item label="Date:">
            <n-input-number v-model:value="converter.document.gregorian.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.gregorian.month" :options="monthOptions" style="width: 160px; " mr-1 />
            <n-input-number v-model:value="converter.document.gregorian.year" style="width: 100px" />
          </n-form-item>

          <n-form-item label="Leap:">
            <input-copyable v-model:value="converter.document.gregorian.leap" readonly />
          </n-form-item>

          <n-form-item label="Time:">
            <n-input-number v-model:value="converter.document.gregorian.hour" style="width: 90px" />
            <span>&#xa0;:&#xa0;</span>
            <n-input-number v-model:value="converter.document.gregorian.min" style="width: 90px" />
            <span>&#xa0;:&#xa0;</span>
            <n-input-number v-model:value="converter.document.gregorian.sec" style="width: 90px" />
          </n-form-item>

          <n-form-item label="Weekday">
            <input-copyable v-model:value="converter.document.gregorian.wday" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" mr-1 @click="() => converter.calcGregorian()">
              Update other calendars
            </n-button>
            <n-button @click="() => { converter.setDateToToday(); converter.updateFromGregorian(); }">
              Today
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Julian Day -->
      <n-tab-pane name="julian-day" tab="Julian Day">
        <n-form :model="converter.document.julianday" label-placement="left">
          <n-form-item label="Julian Day:">
            <n-input-number-i18n v-model:value="converter.document.julianday.day" />
          </n-form-item>
          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcJulian()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Modified Julian Day -->
      <n-tab-pane name="modified-julian" tab="Modified Julian">
        <n-form :model="converter.document.modifiedjulianday" label-placement="left">
          <n-form-item label="Modified Julian Day:">
            <n-input-number-i18n v-model:value="converter.document.modifiedjulianday.day" />
          </n-form-item>
          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcModifiedJulian()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Julian Calendar -->
      <n-tab-pane name="julian-calendar" tab="Julian Calendar">
        <n-form :model="converter.document.juliancalendar" label-placement="left">
          <n-form-item label="Date:">
            <n-input-number v-model:value="converter.document.juliancalendar.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.juliancalendar.month" :options="monthOptions" style="width: 160px; " mr-1 />
            <n-input-number v-model:value="converter.document.juliancalendar.year" style="width: 100px" />
          </n-form-item>
          <n-form-item label="Leap:">
            <input-copyable v-model:value="converter.document.juliancalendar.leap" readonly />
          </n-form-item>
          <n-form-item label="Weekday:">
            <input-copyable v-model:value="converter.document.juliancalendar.wday" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcJulianCalendar()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Gregorian Serial -->
      <n-tab-pane name="greg-serial" tab="Gregorian Serial">
        <n-form :model="converter.document.gregserial" label-placement="left">
          <n-form-item label="Gregorian Serial Day:">
            <n-input-number-i18n v-model:value="converter.document.gregserial.day" />
          </n-form-item>
          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcGregSerial()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Hebrew -->
      <n-tab-pane name="hebrew" tab="Hebrew">
        <n-form :model="converter.document.hebrew" label-placement="left">
          <n-form-item label="Date">
            <n-input-number v-model:value="converter.document.hebrew.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.hebrew.month" :options="hebrewMonths" style="width: 220px; " mr-1 />
            <n-input-number v-model:value="converter.document.hebrew.year" style="width: 100px" />
          </n-form-item>

          <n-form-item label="Leap:">
            <n-input v-model:value="converter.document.hebrew.leap" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcHebrew()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Islamic -->
      <n-tab-pane name="islamic" tab="Islamic">
        <n-form :model="converter.document.islamic" label-placement="left">
          <n-form-item label="Date">
            <n-input-number v-model:value="converter.document.islamic.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.islamic.month" :options="islamicMonths" style="width: 250px; " mr-1 />
            <n-input-number v-model:value="converter.document.islamic.year" style="width: 100px" />
          </n-form-item>

          <n-form-item label="Leap:">
            <n-input v-model:value="converter.document.islamic.leap" readonly />
          </n-form-item>

          <n-form-item label="Weekday">
            <n-input v-model:value="converter.document.islamic.wday" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcIslamic()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Persian -->
      <n-tab-pane name="persian" tab="Persian">
        <n-form :model="converter.document.persian" label-placement="left">
          <n-form-item label="Date">
            <n-input-number v-model:value="converter.document.persian.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.persian.month" :options="persianMonths" style="width: 220px; " mr-1 />
            <n-input-number v-model:value="converter.document.persian.year" style="width: 100px" />
          </n-form-item>

          <n-form-item label="Leap:">
            <n-input v-model:value="converter.document.persian.leap" readonly />
          </n-form-item>

          <n-form-item label="Weekday:">
            <n-input v-model:value="converter.document.persian.wday" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcPersian()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Persian Algorithmic -->
      <n-tab-pane name="persian-algo" tab="Persian Algorithmic">
        <n-form :model="converter.document.persiana" label-placement="left">
          <n-form-item label="Date:">
            <n-input-number v-model:value="converter.document.persiana.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.persiana.month" :options="persianMonths" style="width: 220px; " mr-1 />
            <n-input-number v-model:value="converter.document.persiana.year" style="width: 100px" />
          </n-form-item>

          <n-form-item label="Leap:">
            <input-copyable v-model:value="converter.document.persiana.leap" readonly />
          </n-form-item>
          <n-form-item label="Weekday:">
            <input-copyable v-model:value="converter.document.persiana.wday" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcPersiana()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Mayan -->
      <n-tab-pane name="mayan" tab="Mayan">
        <n-form :model="converter.document.mayancount" label-placement="left">
          <n-form-item label="Long Count:">
            <n-input-number v-model:value="converter.document.mayancount.baktun" style="width: 100px" />
            <span>&#xa0;.&#xa0;</span>
            <n-input-number v-model:value="converter.document.mayancount.katun" style="width: 100px" />
            <span>&#xa0;.&#xa0;</span>
            <n-input-number v-model:value="converter.document.mayancount.tun" style="width: 100px" />
            <span>&#xa0;.&#xa0;</span>
            <n-input-number v-model:value="converter.document.mayancount.uinal" style="width: 100px" />
            <span>&#xa0;.&#xa0;</span>
            <n-input-number v-model:value="converter.document.mayancount.kin" style="width: 100px" />
          </n-form-item>

          <n-form-item label="Haab">
            <input-copyable v-model:value="converter.document.mayancount.haab" readonly />
          </n-form-item>

          <n-form-item label="Tzolkin">
            <input-copyable v-model:value="converter.document.mayancount.tzolkin" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcMayanCount()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Indian Civil -->
      <n-tab-pane name="indian" tab="Indian Civil">
        <n-form :model="converter.document.indiancivilcalendar" label-placement="left">
          <n-form-item label="Date">
            <n-input-number v-model:value="converter.document.indiancivilcalendar.day" style="width: 90px" mr-1 />
            <n-select v-model:value="converter.document.indiancivilcalendar.month" :options="indianMonths" style="width: 220px;" mr-1 />
            <n-input-number v-model:value="converter.document.indiancivilcalendar.year" style="width: 100px" />
          </n-form-item>
          <n-form-item label="Leap:">
            <input-copyable v-model:value="converter.document.indiancivilcalendar.leap" readonly />
          </n-form-item>
          <n-form-item label="Weekday:">
            <input-copyable v-model:value="converter.document.indiancivilcalendar.weekday" readonly />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcIndianCivilCalendar()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- French Republican -->
      <n-tab-pane name="french" tab="French Republican">
        <n-form :model="converter.document.french" label-placement="left" label-width="100px">
          <n-form-item label="Day:">
            <n-select v-model:value="converter.document.french.jour" :options="frenchDays" />
          </n-form-item>

          <n-form-item label="Month:">
            <n-select v-model:value="converter.document.french.mois" :options="frenchMonths" />
          </n-form-item>

          <n-form-item label="Décade:">
            <n-select v-model:value="converter.document.french.decade" :options="frenchDecades" />
          </n-form-item>

          <n-form-item label="Year:">
            <n-input-number v-model:value="converter.document.french.an" />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcFrench()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- ISO -->
      <n-tab-pane name="iso" tab="ISO‑8601">
        <n-form :model="converter.document.isoweek" label-placement="left" label-width="100px">
          <n-form-item label="Day of Week:">
            <n-input-number v-model:value="converter.document.isoweek.day" />
          </n-form-item>

          <n-form-item label="Week:">
            <n-input-number v-model:value="converter.document.isoweek.week" />
          </n-form-item>

          <n-form-item label="Year:">
            <n-input-number v-model:value="converter.document.isoweek.year" />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcIsoWeek()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>

        <n-divider />

        <n-form :model="converter.document.isoday" label-placement="left" label-width="100px">
          <n-form-item label="Day of Year:">
            <n-input-number v-model:value="converter.document.isoday.day" />
          </n-form-item>

          <n-form-item label="Year:">
            <n-input-number v-model:value="converter.document.isoday.year" />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcIsoDay()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Unix -->
      <n-tab-pane name="unix" tab="Unix time()">
        <n-form :model="converter.document.unixtime" label-placement="left">
          <n-form-item label="Unix time():">
            <n-input-number v-model:value="converter.document.unixtime.time" />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcUnixTime()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Excel 1900 -->
      <n-tab-pane name="excel1900" tab="Excel 1900 (Windows)">
        <n-form :model="converter.document.excelserial1900" label-placement="left">
          <n-form-item label="Excel Serial Day (1900):">
            <n-input-number v-model:value="converter.document.excelserial1900.day" />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcExcelSerial1900()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>

      <!-- Excel 1904 -->
      <n-tab-pane name="excel1904" tab="Excel 1904 (Macintosh)">
        <n-form :model="converter.document.excelserial1904" label-placement="left">
          <n-form-item label="Excel Serial Day (1904):">
            <n-input-number v-model:value="converter.document.excelserial1904.day" />
          </n-form-item>

          <n-space justify="center">
            <n-button type="primary" @click="() => converter.calcExcelSerial1904()">
              Update other calendars
            </n-button>
          </n-space>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
