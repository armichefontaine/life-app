import { storeToRefs } from 'pinia'
import { useCartStore } from 'src/stores/cart'
import { reactive, toRefs } from 'vue'
import { uid } from 'quasar'

const useProductCart = (product: any) => {
  const state = reactive({
    ...product,
    quantity: 1
  })
  const store = useCartStore()

  function increase() {
    state.quantity++
  }

  function decrease() {
    if (state.quantity !== 1) state.quantity--
  }

  function addToCart() {
    if (product) store.addProduct({ ...state, cartUid: uid() })
  }

  function resetCart() {
    store.$reset()
  }

  function deleteProduct(uuid: any) {
    store.deleteProduct(uuid)
  }

  function updateCartItem(uid: string, action: string) {
    store.updateCartItem(uid, action)
  }
  return {
    ...toRefs(state),
    ...storeToRefs(store),
    deleteProduct,
    updateCartItem,
    resetCart,
    addToCart,
    state,
    increase,
    decrease
  }
}

export default useProductCart
