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
            :class="[
              'form-control',
              v$.firstName.required.$invalid &&
                submitAction &&
                'form__error--active',
            ]"
            id="firstName"
            v-model="firstName"
          />
          <p
            class="form__error__message"
            v-if="v$.firstName.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
        </label>

        <label for="lastName" class="form-label">
          <span class="form__label">الاسم الاخير</span>

          <input
            type="text"
            :class="[
              'form-control',
              v$.lastName.required.$invalid &&
                submitAction &&
                'form__error--active',
            ]"
            id="lastName"
            v-model="lastName"
          />
          <p
            class="form__error__message"
            v-if="v$.lastName.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
        </label>
      </div>
      <div class="form__data__chunk">
        <label for="email" class="form-label">
          <span class="form__label">البريد الالكتروني</span>
          <input
            type="email"
            :class="[
              'form-control',
              (v$.email.email.$invalid ||
                (v$.email.required.$invalid && submitAction)) &&
                'form__error--active',
            ]"
            id="email"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <p
            class="form__error__message"
            v-if="v$.email.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
          <p
            class="form__error__message"
            v-if="v$.email.email.$invalid && submitAction"
          >
            يرجي ادخال البريد الالكتروني بشكل صحيح
          </p>
        </label>
        <label for="password" class="form-label">
          <span class="form__label">الرقم السري</span>

          <input
            type="password"
            :class="[
              'form-control',
              (v$.password.minLength.$invalid ||
                (v$.password.required.$invalid && submitAction)) &&
                'form__error--active',
            ]"
            id="password"
            v-model="password"
          />
          <p
            class="form__error__message"
            v-if="v$.password.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
          <p
            class="form__error__message"
            v-if="v$.password.minLength.$invalid && submitAction"
          >
            يرجي ادخال علي الاقل ٨ حروف او ارقام او رموز
          </p>
        </label>
        <label for="passwordConfirm" class="form-label">
          <span class="form__label">تاكيد الرقم السري</span>
          <input
            type="password"
            :class="[
              'form-control',
              (password !== passwordConfirm ||
                (v$.passwordConfirm.required.$invalid && submitAction)) &&
                'form__error--active',
            ]"
            id="passwordConfirm"
            v-model="passwordConfirm"
          />

          <p
            class="form__error__message"
            v-if="password !== passwordConfirm && submitAction"
          >
            يرجي التاكد من ادخال نفس الرقم السري
          </p>
        </label>
      </div>
      <div class="form__data__chunk">
        <label for="idNumber" class="form-label">
          <span class="form__label"> الرقم القومي</span>
          <input
            type="number"
            :class="[
              'form-control',
              (v$.idNumber.required.$invalid ||
                v$.idNumber.minLength.$invalid ||
                v$.idNumber.maxLength.$invalid) &&
                submitAction &&
                'form__error--active',
            ]"
            id="idNumber"
            v-model="idNumber"
          />
          <p
            class="form__error__message"
            v-if="v$.idNumber.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
          <p
            class="form__error__message"
            v-if="
              v$.idNumber.minLength.$invalid ||
              (v$.idNumber.maxLength.$invalid && submitAction)
            "
          >
            الرقم القومي مكون فقط من ١٤ رقم
          </p>
        </label>
        <label for="birthDate" class="form-label">
          <span class="form__label">تاريخ الميلاد</span>
          <img
            src="./assets/close.png"
            alt=""
            width="20"
            class="date__delete__btn"
            @click="removeDate"
          />
          <input
            type="date"
            :class="[
              'form-control',
              v$.birthDate.required.$invalid &&
                submitAction &&
                'form__error--active',
            ]"
            id="birthDate"
            v-model="birthDate"
          />

          <p
            class="form__error__message"
            v-if="v$.birthDate.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
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
            v-model="gender"
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
            v-model="gender"
          />
          <label class="form-check-label" for="gender2"> انثي </label>
        </div>
        <p
          class="form__error__message"
          v-if="v$.gender.required.$invalid && submitAction"
        >
          هذه البيانات مطلوبه
        </p>
      </div>
      <div class="form__data__chunk__image">
        <input id="uploadFile" disabled="disabled" class="form__image__hide" />
        <img
          v-if="img"
          src="./assets/close.png"
          alt=""
          width="30"
          class="image__delete__btn"
          @click="removeAvatar"
        />
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
        <p class="form__error__message" v-if="submitAction && !img">
          هذه البيانات مطلوبه
        </p>
      </div>
      <div
        class="form__dynamic__address"
        v-for="(item, index) in addressCount"
        :key="index"
      >
        <h2 class="form__data__chunk__title" v-if="item === 1">
          محل إقامة اساسي
          <p class="form__error__message" v-if="mainAddressRequired">
            يرجي ادخال محل الاقامه الاساسي اولا
          </p>
        </h2>
        <h2 class="form__data__chunk__title" v-else>محل إقامة اضافي</h2>
        <div class="form__data__chunk">
          <label for="country" class="form-label">
            <span class="form__label">الدوله</span>
            <input
              type="text"
              :class="[
                'form-control',
                v$.country.required.$invalid &&
                  submitAction &&
                  'form__error--active',
              ]"
              id="country"
              v-model="country[index]"
            />
            <p
              class="form__error__message"
              v-if="v$.country.required.$invalid && submitAction"
            >
              هذه البيانات مطلوبه
            </p>
          </label>
          <label for="city" class="form-label">
            <span class="form__label">المدينه</span>
            <input
              type="text"
              :class="[
                'form-control',
                v$.city.required.$invalid &&
                  submitAction &&
                  'form__error--active',
              ]"
              id="city"
              v-model="city[index]"
            />
            <p
              class="form__error__message"
              v-if="v$.city.required.$invalid && submitAction"
            >
              هذه البيانات مطلوبه
            </p>
          </label>
          <label for="street" class="form-label">
            <span class="form__label">اسم الشارع</span>
            <input
              type="text"
              :class="[
                'form-control',
                v$.street.required.$invalid &&
                  submitAction &&
                  'form__error--active',
              ]"
              id="street"
              v-model="street[index]"
            />
            <p
              class="form__error__message"
              v-if="v$.street.required.$invalid && submitAction"
            >
              هذه البيانات مطلوبه
            </p>
          </label>
          <label for="flatNo" class="form-label">
            <span class="form__label">رقم الشقه</span>
            <input
              type="number"
              :class="[
                'form-control',
                v$.flatNo.required.$invalid &&
                  submitAction &&
                  'form__error--active',
              ]"
              id="flatNo"
              v-model="flatNo[index]"
            />
            <p
              class="form__error__message"
              v-if="v$.flatNo.required.$invalid && submitAction"
            >
              هذه البيانات مطلوبه
            </p>
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
              type="number"
              :class="[
                'form-control',
                this.phone[0]?.toString()?.length !== 11 &&
                  submitAction &&
                  'form__error--active',
              ]"
              placeholder="0101000xxx"
              aria-label="phone"
              name="phone"
              style="margin-left: -30px"
              v-model="phone[index]"
            />
          </div>
          <p
            class="form__error__message"
            v-if="v$.phone.required.$invalid && submitAction"
          >
            هذه البيانات مطلوبه
          </p>
          <p
            class="form__error__message"
            v-if="
              phone[0]?.toString().length !== 11 &&
              phone[0]?.toString().length > 0
            "
          >
            يرجي ادخال الرقم الصحيح
          </p>
          <p class="form__error__message" v-if="mainPhoneRequired">
            يرجي ادخال رقم المحمول الاساسي قبل اضافه رقم اخر
          </p>
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
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";

export default {
  components: {
    LoaderSpinner,
  },

  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isSubmit: false,
      loading: false,
      img: "",
      addressCount: 1,
      phoneCount: 1,
      phoneCode: "",
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
      mainAddressRequired: false,
      mainPhoneRequired: false,
      submitStatus: false,
      submitAction: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },

    firstName: {
      required,
    },

    lastName: {
      required,
    },

    password: {
      required,
      minLength: minLength(8),
    },

    passwordConfirm: {
      required,
    },
    idNumber: {
      required,
      minLength: minLength(14),
      maxLength: maxLength(14),
    },
    birthDate: {
      required,
    },
    gender: {
      required,
    },
    country: {
      required,
    },
    city: {
      required,
    },
    street: {
      required,
    },
    flatNo: {
      required,
    },
    phone: {
      required,
      minLength: minLength(1),
    },
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
    removeAvatar() {
      this.img = "";
    },
    removeDate() {
      this.birthDate = "";
    },
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
          if (
            (!this.country.length ||
              !this.city.length ||
              !this.street.length ||
              !this.flatNo.length) &&
            this.addressCount !== 1
          ) {
            this.mainAddressRequired = true;
            break;
          }
          this.mainAddressRequired = false;
          this.addressCount = this.addressCount + 1;
          break;
        case "phone":
          if (
            (this.phone.length === 0 ||
              this.phone[0]?.toString()?.length !== 11) &&
            this.phoneCode !== 1
          ) {
            this.mainPhoneRequired = true;
            break;
          }
          this.mainPhoneRequired = false;
          this.phoneCount = this.phoneCount + 1;
          break;
        default:
          return;
      }
    },
    removeFormField(value, index) {
      switch (value) {
        case "address":
          this.country.splice(index, index);
          this.city.splice(index, index);
          this.street.splice(index, index);
          this.flatNo.splice(index, index);
          this.addressCount =
            this.addressCount > 1 ? this.addressCount - 1 : this.addressCount;
          break;
        case "phone":
          this.phone.splice(index, index);
          this.phoneCount =
            this.phoneCount > 1 ? this.phoneCount - 1 : this.phoneCount;
          break;
        default:
          return;
      }
    },
    submitFormData() {
      this.isSubmit = true;
      let addresses = [];
      for (let i = 0; i < this.addressCount; i++) {
        addresses.push({
          country: this.country[i],
          city: this.city[i],
          street: this.street[i],
          flatNumber: this.flatNo[i],
        });
      }
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        id: this.idNumber,
        birthDate: this.birthDate,
        imgUrl: this.img,
        gender: this.gender,
        address: addresses,
        phone: this.phone,
      };
      this.submitAction = true;

      if (this.v$.$silentErrors.length === 0) {
        console.log(data);
        this.submitStatus = true;
      } else {
        console.error("Error due to invalid fields");
      }
    },
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
