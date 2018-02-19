

      var post_storage ={

          fetch: function(){

            var posts = JSON.parse(localStorage.getItem('posts') || '[]');
            return posts;
          },

          save: function(posts){

            localStorage.setItem('posts',JSON.stringify(posts) );
          }


      }


new Vue({

	el:'#post',
	data:{
		posts:post_storage.fetch(),
		postText:'',
		images:[],
		liked:false,
		showImg:'',
		descriptionImg:'',
		showPost:false,
		likes:15,
		likeDone:'',
		isActive:'fas',
		isFalse:false,
		//views:52,
		image:'',
	},

	watch:{

		liked(value,index){

			console.log(index);
			var likeStatus = value;
			//console.log(likeStatus);
			if (value){
				return this.likes++;
				this.likeDone="far";
			}else{

				return this.likes--;
				this.likeDone="";
			}
		},


          posts:{
            handler:function(posts){
             // console.log(todos);
             post_storage.save(posts);
            },
            deep:true
          },
          		 countLike(index){
		 	console.log(this.posts[index].liked);
		 	if (this.posts[index].liked) {
		 		this.posts[index].likes++
		 	}else{
		 		this.posts[index].likes--
		 	}

		 },
	},
	computed:{

		className(){
			return(this.liked) ?'like':'';
		},

		orderAllPosts(){

			return orderBy(this.posts,'image');
		}
	},
	methods:{

		saveData(){

			var d = new Date();
			this.posts.push({
				'desc':this.postText,
				image:this.image,
				liked:false,
				likes:'',
				views:'',

			});
			post_storage.save(this.posts);
			this.postText='';
			this.image = null;
			 this.$refs.imageInput.value = null;
			 //https://stackoverflow.com/questions/44344916/how-can-i-reset-input-data-on-the-modal-in-vue-js-2
			 

		},

		postView(index){
			this.posts[index].views++;
			
	},

		getImage(e){
			var  files = e.target.files || e.dataTransfer.files;

			if (!files.length)
				return;
			this.createImage(files[0])
		},

		createImage(file){

			var image = new Image();
			var reader = new FileReader();
			reader.onload = (e) => {
				this.image = e.target.result;
			};

			reader.readAsDataURL(file);
			this.image = '';
		},


		 showImage(index){
		 	this.showPost = true;
		 	this.showImg = this.posts[index].image;
		 	//console.log(this.showImg);
		 	this.descriptionImg = this.posts[index].desc;
		 },

		 exitPost(){this.showPost = false;},



		 backLike(index){
		 	this.posts[index].liked = false;
		 	console.log(this.posts[index].liked);
		 }
}

})