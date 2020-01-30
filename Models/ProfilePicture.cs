using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class ProfilePicture
    {
        public ProfilePicture()
        {
            Users = new HashSet<Users>();
        }

        public int Id { get; set; }
        public string PictureLocation { get; set; }
        public string Hash { get; set; }
        public int? UserId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Users> Users { get; set; }
    }
}
