<template>
  <div class="edit-menu">
    <button class="button is-primary" @click="togglePopup">Edit Profile</button>
    <div class="popup" v-if="popupActive" ref="popup" @keydown.tab.prevent="trapFocus">
      <div class="popup-content">
        <h1 class="title is-3">
          Edit Profile
        </h1>
        <form @submit.prevent="postUserChanges">
          <!-- <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div> -->
          <div class="field">
            <label>Bio</label>
            <div class="control">
              <textarea type="textarea" class="input" v-model="bio"/>
            </div>
          </div>
          <div class="field">
            <label>Birthday</label>
            <div class="control">
              <input type="date" class="input" v-model="formattedBirthday">
            </div>
          </div>
          <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
          <div class="file is-centered is-medium is-boxed">
            <label class="file-label">
              <input 
                ref="fileInput"
                class="file-input"
                type="file"
                name="banner"
                @change="handleFileChange"
                accept="image/*"
              >
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Change Profile Picture
                </span>
              </span>
            </label>
          </div>
          <div class="control">
            <button class="button is-dark">Submit</button>
          </div>
        </form>
        <button class="button is-danger" @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiCall from '../../helpers/apiCall'
import { 
  createOrReplaceProfile,
  fetchSanity
} from '../../helpers/sanity';

export default {
  props: {
    uid: Number,
    userName: String,
    biography: String,
    birth: String,
    sanityProfileId: String,
    profileImageUrl: String,
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username: this.userName || '',
      bio: this.biography || '',
      birthday: this.parseDateString(this.birth) || new Date(),
      formattedBirthday: this.formatDate(this.birth),
      popupActive: this.isOpen,
      imageFile: null,
      imagePreview: null,
      uploadImage:null
    };
  },
  methods: {
    parseDateString(dateString) {
      if(!dateString) {
        return null;
      }
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    },
    formatDate(dateString) {
      if (!dateString) {
        return '';
      }
      const date = this.parseDateString(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0-indexed months
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async postUserChanges(){
      let sanityResponse

      if(this.imageFile) {
        sanityResponse = 
        await createOrReplaceProfile(this.sanityProfileId, this.username, this.uid, this.imageFile)
          .catch(err => {
            console.error(err)
            return
          })
        imageUrl = sanityResponse.profileImageAsset.url
      }

      const reqBody = {
        user: this.uid,
        birthday: this.formattedBirthday,
        bio: this.bio,
      }

      if(this.imageUrl) {
        reqBody['profile_image'] = this.imageUrl
        reqBody['thumbnail'] = this.imageUrl
      }

      const apiResponse = await apiCall(
        'patch',
        `edit-profile/${this.uid}/`,
        this.$store.state.token,
        reqBody)
        .then(response => {
          return response?.data
        }).catch(err => {
          console.error(err.message)
          return
        })
      this.$router.go(0)
    },
    handleFileChange(event) {
      this.imageFile = event.target.files[0]
      if (this.imageFile && this.imageFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imagePreview = reader.result
        }
        reader.readAsDataURL(this.imageFile)
        this.uploadImage = new FormData()
        this.uploadImage.append('image', this.imageFile)
      }
    },
    togglePopup() {
      this.bio = this.biography
      this.username = this.userName
      this.popupActive = true;
      this.formattedBirthday = this.formatDate(this.birth)
      this.$nextTick(() => {
        this.$refs.popup.focus();
      });
    },
    closePopup() {
      this.popupActive = false;
    },
    trapFocus(event) {
      const popup = this.$refs.popup;
      const focusableElements = popup.querySelectorAll('button');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      } else if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    },
  },
};
</script>

<style scoped>
.edit-menu {
  margin: 1rem auto;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 10;
  outline: none;
}

.button {
  margin: 1rem;
}

.popup-content {
  text-align: center;
}
</style>
