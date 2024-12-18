import Vue from 'vue';
import Router from 'vue-router';
import CatalogPage from '@/components/CatalogPage.vue';
import CartPage from '@/components/CartPage.vue';
import CheckoutPage from '@/components/CheckoutPage.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: CatalogPage },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
