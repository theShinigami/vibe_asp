using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comments>();
            Plike = new HashSet<Plike>();
        }

        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? Uid { get; set; }
        public int? ImgId { get; set; }
        public string Caption { get; set; }
        public string Title { get; set; }

        public virtual Image Img { get; set; }
        public virtual Users U { get; set; }
        public virtual ICollection<Comments> Comments { get; set; }
        public virtual ICollection<Plike> Plike { get; set; }
    }
}
