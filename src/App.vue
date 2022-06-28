<template>
  <div class="container">
    <div class="form__header">
      <h1 class="form__header__title">استماره التسجيل</h1>
      <p class="form__header__text">جميع البيانات المطلوبة الزامية</p>
    </div>
    <form>
      <h2 class="form__data__chunk__title form__title--main">
        البيانات الاساسيه
      </h2>
      <div class="form__data__chunk">
        <label for="firstName" class="form-label">
          <span class="form__label">الاسم الاول</span>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="formData.firstName"
          />
        </label>
        <label for="lastName" class="form-label">
          <span class="form__label">الاسم الاخير</span>

          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="formData.lastName"
          />
        </label>
      </div>
      <div class="form__data__chunk">
        <label for="email" class="form-label">
          <span class="form__label">البريد الالكتروني</span>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            v-model="formData.email"
          />
        </label>
        <label for="password" class="form-label">
          <span class="form__label">الرقم السري</span>

          <input
            type="password"
            class="form-control"
            id="password"
            v-model="formData.password"
          />
        </label>
        <label for="passwordConfirm" class="form-label">
          <span class="form__label">تاكيد الرقم السري</span>

          <input
            type="passwordConfirm"
            class="form-control"
            id="password"
            v-model="formData.passwordConfirm"
          />
        </label>
      </div>
      <div class="form__data__chunk">
        <label for="idNumber" class="form-label">
          <span class="form__label"> الرقم القومي</span>
          <input
            type="number"
            class="form-control"
            id="idNumber"
            v-model="formData.idNumber"
          />
        </label>
        <label for="birthDate" class="form-label">
          <span class="form__label">تاريخ الميلاد</span>
          <input
            type="date"
            class="form-control"
            id="birthDate"
            v-model="formData.birthDate"
          />
        </label>
      </div>
      <div class="form__data__radio__chunk">
        <h2>النوع :</h2>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="gender1"
            value="male"
            v-model="formData.gender"
          />
          <label class="form-check-label" for="gender1"> ذكر </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="gender2"
            value="female"
            v-model="formData.gender"
          />
          <label class="form-check-label" for="gender2"> انثي </label>
        </div>
      </div>
      <div class="form__data__chunk__image">
        <input id="uploadFile" disabled="disabled" class="form__image__hide" />
        <img class="image__placeholder" src="./assets/avatar.png" v-if="!img" />

        <img class="image__placeholder" :src="img" v-else />
        <div class="fileUpload">
          <span>اختيار صوره شخصيه</span>

          <input
            accept="image/png, image/jpg, image/jpeg"
            id="uploadBtn"
            type="file"
            class="upload"
            @change="(event) => changeAvatar(event)"
          />
          <LoaderSpinner
            :loading="loading"
            color="#22272E"
            class="loader__spinner"
            size="15px"
          />
        </div>
      </div>
      <div
        class="form__dynamic__address"
        v-for="(item, index) in addressCount"
        :key="index"
      >
        <h2 class="form__data__chunk__title" v-if="item === 1">
          محل إقامة اساسي
        </h2>
        <h2 class="form__data__chunk__title" v-else>محل إقامة اضافي</h2>
        <div class="form__data__chunk">
          <label for="country" class="form-label">
            <span class="form__label">الدوله</span>
            <input
              type="text"
              class="form-control"
              id="country"
              v-model="formData.country[index]"
            />
          </label>
          <label for="city" class="form-label">
            <span class="form__label">المدينه</span>
            <input
              type="text"
              class="form-control"
              id="city"
              v-model="formData.city[index]"
            />
          </label>
          <label for="street" class="form-label">
            <span class="form__label">اسم الشارع</span>
            <input
              type="text"
              class="form-control"
              id="street"
              v-model="formData.street[index]"
            />
          </label>
          <label for="flatNo" class="form-label">
            <span class="form__label">رقم الشقه</span>
            <input
              type="text"
              class="form-control"
              id="flatNo"
              v-model="formData.flatNo[index]"
            />
          </label>
        </div>
        <div class="toggle__field__buttons">
          <button
            v-if="index === 0"
            class="toggle__field__button"
            @click.prevent="addFormField('address')"
          >
            اضافه محل إقامة جديد
            <img src="./assets/add.png" width="20" />
          </button>
          <button
            v-if="addressCount > 1 && index !== 0"
            class="toggle__field__button"
            @click.prevent="removeFormField('address', index)"
          >
            ازاله محل إقامة
            <img src="./assets/remove.png" width="20" />
          </button>
        </div>
      </div>

      <div
        class="form__dynamic__phone"
        v-for="(item, index) in phoneCount"
        :key="index"
      >
        <div class="form__data__chunk">
          <h2 class="form__data__chunk__title">
            {{ item === 1 ? "المحمول الاساسي" : "المحمول الاضافي" }}
            <img
              src="./assets/remove.png"
              v-if="item > 1"
              width="20"
              style="cursor: pointer"
              @click="removeFormField('phone', index)"
            />
          </h2>
          <div
            class="input-group mb-3"
            style="flex-direction: row-reverse; align-items: center"
          >
            <span class="input-group-text" id="basic-addon1"
              >{{ phoneCode ? phoneCode : "20" }}+</span
            >
            <img
              src="./assets/square-add.png"
              width="25"
              style="z-index: 999; cursor: pointer"
              @click="addFormField('phone')"
            />

            <input
              type="text"
              class="form-control"
              placeholder="0101000xxx"
              aria-label="phone"
              name="phone"
              style="margin-left: -30px"
              v-model="formData.phone[index]"
            />
          </div>
        </div>
      </div>
      <button class="form__submit__button" @click.prevent="submitFormData">
        ارسال البيانات
      </button>
    </form>
  </div>
</template>

<script>
import LoaderSpinner from "vue-spinner/src/ClipLoader.vue";
export default {
  components: {
    LoaderSpinner,
  },
  data() {
    return {
      loading: false,
      img: "",
      addressCount: 1,
      phoneCount: 1,
      phoneCode: "",
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        idNumber: "",
        birthDate: "",
        passwordConfirm: "",
        gender: "",
        profile: "",
        country: [],
        city: [],
        street: [],
        flatNo: [],
        phone: [],
      },
    };
  },
  mounted() {
    fetch(
      "https://api.geoapify.com/v1/ipinfo?&apiKey=c124d10b78274af6832bc497eaf2027a"
    )
      .then((response) => response.json())
      .then((result) => (this.phoneCode = result?.country?.phone_code))
      .catch((error) => console.log("error", error));
  },

  methods: {
    changeAvatar(event) {
      this.loading = true;
      setTimeout(() => {
        this.img = URL.createObjectURL(event.target.files[0]);
        this.loading = false;
      }, 3000);
    },
    addFormField(value) {
      switch (value) {
        case "address":
          this.addressCount = this.addressCount + 1;
          break;
        case "phone":
          this.phoneCount = this.phoneCount + 1;
          break;
        default:
          return;
      }
    },
    removeFormField(value, index) {
      switch (value) {
        case "address":
          this.formData.country.splice(index, index);
          this.formData.city.splice(index, index);
          this.formData.street.splice(index, index);
          this.formData.flatNo.splice(index, index);
          this.addressCount =
            this.addressCount > 1 ? this.addressCount - 1 : this.addressCount;
          break;
        case "phone":
          this.formData.phone.splice(index, index);
          this.phoneCount =
            this.phoneCount > 1 ? this.phoneCount - 1 : this.phoneCount;
          break;
        default:
          return;
      }
    },
    submitFormData() {
      let addresses = [];
      if (this.addressCount > 1) {
        for (let i = 0; i < this.addressCount; i++) {
          addresses.push({
            country: this.formData.country[i],
            city: this.formData.city[i],
            street: this.formData.street[i],
            flatNumber: this.formData.flatNo[i],
          });
        }
      }
      const data = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        password: this.formData.password,
        id: this.formData.idNumber,
        birthDate: this.formData.birthDate,
        imgUrl: this.img,
        gender: this.formData.gender,
        address: addresses,
        phone: this.formData.phone,
      };
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
