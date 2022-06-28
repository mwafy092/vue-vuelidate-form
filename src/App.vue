<template>
  <div class="container">
    <div class="form__header">
      <h1 class="form__header__title">استماره التسجيل</h1>
      <p class="form__header__text">جميع البيانات المطلوبة الزامية</p>
    </div>
    <form>
      <div class="form__data__chunk">
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label">الاسم الاول</span>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label">الاسم الاخير</span>

          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
      </div>
      <div class="form__data__chunk">
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label">البريد الالكتروني</span>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label">الرقم السري</span>

          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label">تاكيد الرقم السري</span>

          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
      </div>
      <div class="form__data__chunk">
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label"> الرقم القومي</span>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
        <label for="exampleInputEmail1" class="form-label">
          <span class="form__label">تاريخ الميلاد</span>
          <input
            type="date"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>
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
          <label for="exampleInputEmail1" class="form-label">
            <span class="form__label">الدوله</span>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </label>
          <label for="exampleInputEmail1" class="form-label">
            <span class="form__label">المدينه</span>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </label>
          <label for="exampleInputEmail1" class="form-label">
            <span class="form__label">اسم الشارع</span>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </label>
          <label for="exampleInputEmail1" class="form-label">
            <span class="form__label">رقم الشقه</span>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </label>
        </div>
      </div>
      <div class="toggle__field__buttons">
        <button
          class="toggle__field__button"
          @click.prevent="addFormField('address')"
        >
          اضافه محل إقامة جديد
          <img src="./assets/add.png" width="20" />
        </button>
        <button
          v-if="addressCount > 1"
          class="toggle__field__button"
          @click.prevent="removeFormField('address')"
        >
          ازاله محل إقامة
          <img src="./assets/remove.png" width="20" />
        </button>
      </div>
      <div class="form__data__radio__chunk">
        <h2>النوع :</h2>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1"> ذكر </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2"> انثي </label>
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
              @click="removeFormField('phone')"
            />
          </h2>
          <div
            class="input-group mb-3"
            style="flex-direction: row-reverse; align-items: center"
          >
            <span class="input-group-text" id="basic-addon1">02+</span>
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
              aria-label="Username"
              aria-describedby="basic-addon1"
              style="margin-left: -30px"
            />
          </div>
        </div>
      </div>
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
    };
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
    removeFormField(value) {
      switch (value) {
        case "address":
          this.addressCount =
            this.addressCount > 1 ? this.addressCount - 1 : this.addressCount;
          break;
        case "phone":
          this.phoneCount =
            this.phoneCount > 1 ? this.phoneCount - 1 : this.phoneCount;
          break;
        default:
          return;
      }
    },
  },
};
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
