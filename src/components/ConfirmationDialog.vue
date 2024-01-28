<template>
    <!-- Button trigger modal -->
  <div v-if="icon">
    <font-awesome-icon :icon="icon" class="icon-confirmation" @click="openModal" :data-bs-target="modalId"/>
  </div>
  <div v-else>
    <button type="button" @click="openModal" :data-bs-target="modalId">{{ action }}</button>
  </div>

  <!-- Modal -->
  <div class="modal fade" :id="modalId" data-bs-backdrop="static" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button"  data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn-submit-form" @click="handleConfirmAction">Okay</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Modal } from 'bootstrap';
  
  export default {
    props: {
      action: String,
      message: String,
      title: String,
      icon: String
    },
    emits: ['confirm-action'],
    setup(props, {emit}) {
      const modalId = `confirmation-dialog-${Math.random().toString(36).substring(7)}`;
      var myModal = null;

      const openModal = () => {
        myModal = new Modal(document.getElementById(modalId), {});
        myModal.show();
      }

      
      const handleConfirmAction = () => {
        emit('confirm-action');
      }
  
      return { openModal, handleConfirmAction, modalId };
    },
  };
  </script>
  
  <style scoped>
  .confirmation-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  
  .dialog-content {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    min-width: 450px;
    min-height: 300px;
  }

  .btn-close:hover {
    background: var(--bs-btn-close-bg) center/1em auto no-repeat;
    color: var(--bs-btn-close-color);;
  }
  .icon-confirmation {
    cursor: pointer;
  }
  </style>
  