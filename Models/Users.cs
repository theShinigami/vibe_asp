using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Users
    {
        public Users()
        {
            Comments = new HashSet<Comments>();
            FollowerFollowsNavigation = new HashSet<Follower>();
            FollowerUserNavigation = new HashSet<Follower>();
            MessageFromNavigation = new HashSet<Message>();
            MessageToNavigation = new HashSet<Message>();
            Plike = new HashSet<Plike>();
            Post = new HashSet<Post>();
            ProfilePicture = new HashSet<ProfilePicture>();
            Settings = new HashSet<Settings>();
        }

        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public int? Picture { get; set; }
        public int? Background { get; set; }
        public string Bio { get; set; }
        public int? Payment { get; set; }
        public string Skills { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ProfilePicture PictureNavigation { get; set; }
        public virtual ICollection<Comments> Comments { get; set; }
        public virtual ICollection<Follower> FollowerFollowsNavigation { get; set; }
        public virtual ICollection<Follower> FollowerUserNavigation { get; set; }
        public virtual ICollection<Message> MessageFromNavigation { get; set; }
        public virtual ICollection<Message> MessageToNavigation { get; set; }
        public virtual ICollection<Plike> Plike { get; set; }
        public virtual ICollection<Post> Post { get; set; }
        public virtual ICollection<ProfilePicture> ProfilePicture { get; set; }
        public virtual ICollection<Settings> Settings { get; set; }
    }
}
