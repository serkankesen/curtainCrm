using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace skn_curtain_Data.Entities
{
    public interface IRowVersion
    {
        int RowVersion { get; set; }
    }

    public interface IBaseEntity : IRowVersion
    {
        long ID { get; set; }
        string Editor { get; set; }
        string Creator { get; set; }
        DateTime CreatedDate { get; set; }
        DateTime EditedDate { get; set; }
    }
    public class BaseEntity : IBaseEntity
    {
        public BaseEntity()
        {
            CreatedDate = DateTime.Now;
            EditedDate = DateTime.Now;
            Creator = "Binbirgece";
            Editor = "Binbirgece";

        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        [Required, MaxLength(128)]
        public string Editor { get; set; }
        [Required, MaxLength(128)]
        public string Creator { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime EditedDate { get; set; }
        public int RowVersion { get; set; }
    }
}
