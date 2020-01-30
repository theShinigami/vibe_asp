using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Users
    {
        public Users()
        {
            Comments = new HashSet<Comments>();
            Follower = new HashSet<Follower>();
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
        public string Bio { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual ProfilePicture PictureNavigation { get; set; }
        public virtual ICollection<Comments> Comments { get; set; }
        public virtual ICollection<Follower> Follower { get; set; }
        public virtual ICollection<Post> Post { get; set; }
        public virtual ICollection<ProfilePicture> ProfilePicture { get; set; }
        public virtual ICollection<Settings> Settings { get; set; }
    }
}
