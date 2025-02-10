export default {
    mounted(el, binding) {
        if (binding.value) {
            el.style.border = '2px solid red';
        }
    }
};