import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProviderService } from '../service/provider.service';
import { InputDialogService } from '../service/input-dialog/input-dialog.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  [x: string]: any;

  title = "Grocery List";
  constructor(public NavController: NavController,public toastController: ToastController, 
    public alertController: AlertController, public dataService: ProviderService, public inputDialogService: InputDialogService, public socialSharing: SocialSharing) {}


  loadItems() {
    return this.dataService.getItems();
  }
  async removeItem(item, index) {
    console.log("Removing Item -", item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item -' + index + "...",
      duration: 3000
    });
    await toast.present();
    this.dataService.removeItem(index);
  }
  async shareItem(item, index) {
    console.log("Sharing Item -", item, index);
    const toast = await this.toastController.create({
      message: 'Sharing Item -' + index + "...",
      duration: 3000
    });
    await toast.present();
    let message = "Grocery Item - Name: " + item.name + "- Quantity: " + item.quantity;
    let subject = "Shared via Grocery";
    this.socialSharing.share(message, subject).then(() => {
      console.log("Share successfully!");
    }).catch((error) => {
      console.error("Error while sharing")
    });
  }

  async editItem(item, index) {
    console.log("Edit Item -", item, index);
    const toast = await this.toastController.create({
      message: 'Editing Item -' + index + "...",
      duration: 3000
    });
    await toast.present();
    this.inputDialogService.showPrompt(item, index);
  }


  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }


}
