import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;
  com: Comment;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private formBuilder: FormBuilder, public modalCtrl: ModalController) {
    this.comment = this.formBuilder.group({
      author: ['', Validators.required],
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    console.log(this.comment);
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.com = this.comment.value;
    var d = new Date();
    var n = d.toISOString();
    this.com.date = n;
    console.log(this.com);
    this.viewCtrl.dismiss(this.com);
  }

}
