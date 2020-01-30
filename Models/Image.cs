using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Image
    {
        public Image()
        {
            Post = new HashSet<Post>();
        }

        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string PicLocation { get; set; }
        public string UploadedBy { get; set; }
        public string Hash { get; set; }

        public virtual ICollection<Post> Post { get; set; }
    }
}
