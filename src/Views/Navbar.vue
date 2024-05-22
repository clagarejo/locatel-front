<template>
  <div class="navbar">
    <router-link class="logo" to=""> 
     <!-- <img src="../assets/locatel.webp" alt="Logo"> -->
     <font-awesome-icon icon="user" />

    </router-link>

    <ul class="navbar-nav d-flex flex-row">
      <li class="nav-item">
        <router-link to="/" class="nav-link" exact-active-class="active"> Usuarios </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/accounts" class="nav-link" exact-active-class="active"> Cuentas </router-link>
      </li>
    </ul>
  </div>

</template>

<style scoped>
.navbar {
  background-color: #01962d; 
  padding: 10px 20px; 
  display: flex; 
  justify-content: space-between; 
}

.navbar-nav {
  list-style: none; 
  padding: 0; 
  margin: 0; 
  display: flex; 
  margin-right: 3%;
}

.nav-item {
  margin-right: 15px; 
}

.nav-link {
  text-decoration: none; 
  color: #fff; 
  padding: 10px 15px; 
  border-radius: 5px; 
  transition: background-color 0.3s ease; 
}

.nav-link:hover {
  background-color: #2f5e3a; 
}

.nav-link.active {
  background-color: #2a5c36; 
  color: #fff;
}

.logo {
  margin-left: 3%;
  color: #fff;
  font-size: 1.3rem;
}

.logo img {
  width: 35%;
}
</style>
