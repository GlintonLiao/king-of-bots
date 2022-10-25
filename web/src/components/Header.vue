<script setup lang="ts">
const user = useUserStore()

console.log(user.isLogin);

const isShow = ref(false)

const logout = () => {
  localStorage.removeItem('jwtToken')
  user.username = ''
  user.id = ''
  user.photo = ''
  user.isLogin = false
  user.token = ''
}

const show = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <nav class="text-xl mb-5 flex justify-around color-bluegray">
    <div class="">
      <button class="px-5">
        Battle
      </button>
      <button class="px-5">
        Game List
      </button>
      <button class="px-5">
        Ranking
      </button>
    </div>

    <div v-if="user.isLogin" class="dropdown">
      <button class="dropbtn" @click="show">
        {{ user.username }}
      </button>
      <div id="myDropdown" class="dropdown-content" :class="{ show: isShow }">
        <RouterLink w-full to="/user/">
          User Center
        </RouterLink>
        <button w-full @click="logout">
          Logout
        </button>
      </div>
    </div>
    <div v-else>
      <RouterLink p-x-3 to="/account/login">
        Login
      </RouterLink>
      <RouterLink to="/account/login">
        Register
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>/* Dropdown Button */
.dropbtn {
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Change color of dropdown links on hover */
.dropdown-content *:hover {background-color: #ddd;}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
  display:block;
}
</style>
