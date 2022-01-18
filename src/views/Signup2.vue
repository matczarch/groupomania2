<template>
  <div class="inscription">
    <div class="main">
      <div class="signup">
        <form method="POST" @submit.prevent="createNewAccount">
          <div class="container">
            <section class="name">
              <div>
                <label for="nom">Nom</label>
                <input
                  type="text"
                  placeholder="Smith"
                  name="nom"
                  id="nom"
                  required
                  v-model="user.lastname"
                />
              </div>
              <div>
                <label for="prenom">Prénom</label>
                <input
                  type="text"
                  placeholder="John"
                  name="prenom"
                  id="prenom"
                  required
                  v-model="user.firstname"
                />
              </div>
            </section>
            <div class="email">
              <label for="email">E-mail</label>
              <input
                type="text"
                placeholder="jonh.smith@gmail.com"
                name="email"
                id="email"
                required
                v-model="user.email"
              />
            </div>

            <div>
              <label for="mot_de_passe">Mot de passe</label>
              <section class="passwordLine">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  id="password"
                  required
                  v-model="user.password"
                />
              </section>
            </div>
            <button class="formSubmit" id="formSubmit--signup">
              Inscription
            </button>
          </div>
          <div class="container">
            <span class="formQuestion">Déjà inscrit-e ?</span>
            <router-link to="login">
              <button class="formExit" type="button">Connexion</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  name: "signup",
  components: { Footer },
  data() {
    return {
      user: {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    createNewAccount() {
      if (this.formValidation() == true) {
        //Deux version 1 essaie utilisation de axios
        const Data = {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.password,
        };

        axios({
          method: "POST",
          url: "http://localhost:3000/api/user/signup",
          data: Data,
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    formValidation() {
      //création des regex
      let nameRegex = /^[A-Za-zéèêëïàöô-]+$/;
      let emailRegex = /.+@.+\..+/;

      //inputs checking wuth the reges rules
      if (nameRegex.test(this.user.firstname) == false) {
        alert("Votre nom doit être indiqué et ne doit pas contenir de chiffre");
        return false;
      } else if (nameRegex.test(this.user.lastname) == false) {
        alert(
          "Votre prénom doit être indiqué et ne doit pas contenir de chiffre"
        );
        return false;
      } else if (emailRegex.test(this.user.email) == false) {
        alert(
          "Votre e-mail doit être indiqué et doit être au format xxx@yyy.zzz"
        );
        return false;
      } else if (this.passwordCueKey() == false) {
        alert("Merci de respecter les consignes du mot de passe!");
        return false;
      } else {
        return true;
      }
    },
    passwordCueKey() {
      let password = document.getElementId("password");
      let letter = document.getElementId("letter");
      let capital = document.getElementId("capital");
      let number = document.getElementId("number");
      let length = document.getElementId("length");

      //Validation des lettres minuscule
      var lowerCaseLetters = /[a-z]/g;
      if (password.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      //Validation lettre capitale
      var upperCaseLetter = /[A-Z]/g;
      if (password.value.match(upperCaseLetter)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      //Validation nombres
      var numbers = /[0-9]/g;
      if (password.value.match(numbers)) {
        numbers.classList.remove("invalid");
        numbers.classList.add("valid");
      } else {
        numbers.classList.remove("valid");
        numbers.classList.add("invalid");
      }

      //Validation longeurs
      if (password.value.length >= 6) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }

      //Vérification final
      if (
        letter.classList.contains("valid") &&
        capital.classList.contains("valid") &&
        number.classList.contains("valid") &&
        length.classList.contains("valid")
      ) {
        document.getElementId("validationTitle").textContent =
          "Le mot de passe est valide";
      } else {
        document.getElementId("validationTitle").textContent =
          "Le mot de passe doit contenir :";
        return false;
      }
    },
  },
};
</script>

<style lang='scss'>
</style>