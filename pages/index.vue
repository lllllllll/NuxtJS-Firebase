<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Nuxtjs-01
      </h1>
      <div>
        {{firebaseData}}
      </div>
      <div>
        <Input v-model="name" placeholder="Enter something..." style="width: 300px" />
        <Input v-model="lastname" placeholder="Enter something..." style="width: 300px" />
        <Button @click="updateFirebase" type="primary">Submit</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/store/firebase'
import Logo from '~/components/Logo.vue'
import { debounce } from 'debounce';

const documentPath = 'contacts/jeff';

export default {
  components: {
    Logo
  },
  data() {
    return {
      name: '',
      lastname: '',
      firebaseData: null,
    }
  },
  firestore() {
    return {
      firebaseData: db.doc(documentPath),
    };
  },
  methods: {
    async updateFirebase() {
      console.log('{name: this.name, lastname: this.lastname} >> ', this.name, this.lastname);
      
      try {
        await db.doc(documentPath).set({name: this.name, lastname: this.lastname});
        this.state = 'synced';
      } catch (error) {
        this.errorMessage = JSON.stringify(error)
        this.state = 'error';
      }
    }
  },
  created: async function () {
    const docRef = db.doc(documentPath);
    console.log('Doc Ref >>>>>  ', docRef);

    let data = (await docRef.get()).data();
    console.log('Doc Ref data >>>>>  ', data);
    if (!data) {
      data = { name: '', lastname: '' }
      docRef.set(data)
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  padding: 52px 0;
  min-height: 100vh;
  max-width: 800px;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-size: 21px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
