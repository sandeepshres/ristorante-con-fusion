import { Component, Inject } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  comment: Comment;
  com: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL, private favoriteservice: FavoriteProvider, private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController, private socialSharing: SocialSharing) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  openComment() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(data => {
      if(data) {
        this.com = data;
      console.log(this.com);
      this.dish.comments.push(this.com);
    }
   });
   modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
   console.log('Adding to Favorites', this.dish.id);
   this.favorite = this.favoriteservice.addFavorite(this.dish.id);
   this.toastCtrl.create({
     message: 'Dish ' + this.dish.id + ' added as favorite successfully',
     position: 'middle',
     duration: 3000}).present();
 }

 presentActionSheet() {
   const actionSheet = this.actionSheetCtrl.create({
     title: 'Select Actions',
     buttons: [
       {
         text: 'Add to Favorites',
         handler: () => {
           console.log('Added to Favorites');
           this.addToFavorites();
         }
       },
       {
         text: 'Add Comment',
         handler: () => {
           console.log('Add comment clicked');
           this.openComment();
         }
       },
       {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });
   actionSheet.present();
 }


}
