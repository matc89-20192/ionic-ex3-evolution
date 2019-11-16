import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Tarefa } from '../../providers/tarefa/tarefa';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  descricao: string = "";
  prioridade: number;

  items: Array<Tarefa>;

  constructor(public toastController: ToastController, public navCtrl: NavController) {
    this.items = [];
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  validationDescricao(): boolean {

    var retorno = true;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]["descricao"] == this.descricao) {
        retorno = false;
        this.presentToast('Tarefa já cadastrada.');
        break;
      }
    }
    return retorno;
  }

  validationPrioridade(): boolean {
    if (this.prioridade >= 0 && this.prioridade <= 10) {
      return true;
    } else {
      this.presentToast('A prioridade deve estar entre 1 e 10.');
      return false;
    }
  }

  addItem() {

    if (this.validationDescricao() && this.validationPrioridade()) {

      this.items.push({
        descricao: this.descricao,
        prioridade: this.prioridade
      });

      this.items.sort(function (obj1, obj2) {
        // Ascending: first age less than the previous
        return obj1.prioridade - obj2.prioridade;
      });

      this.clearInput();

      this.releaseButton();
    }
  }

  clearInput() {
    this.prioridade = null;
    this.descricao = "";
  }

  removerFirst() {
    this.items.shift();

    this.releaseButton();
  }

  itemTapped(event) {
    this.items.splice(event, 1);
    this.releaseButton();
  }

  releaseButton() {
    if (this.items.length > 0) {
      (<HTMLButtonElement>document.getElementById('buttonRemover')).disabled = false;
    } else {
      (<HTMLButtonElement>document.getElementById('buttonRemover')).disabled = true;
    }
  }
}
