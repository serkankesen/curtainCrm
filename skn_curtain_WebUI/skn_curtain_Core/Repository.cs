using System;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;

namespace skn_curtain_Core
{
    public interface ICRUD : IDisposable
    {
        int RowCount(string tableName, string columnName = null, long? id = null);
        T FindById<T>(long id) where T : class;
        void Create<T>(T model) where T : class;
        void Update<T>(T model) where T : class;
        void Delete<T>(int id) where T : class;
        void Save();
    }
    public abstract class CRUD : ICRUD
    {
        private bool _disposed;
        string errorMessage = string.Empty;
        private CurtainDbContext _context = new CurtainDbContext();
        protected CurtainDbContext db
        {
            get { return _context; }
            private set { _context = value; }
        }


  

        public virtual T FindById<T>(long id) where T : class
        {
            T model = db.Set<T>().Find(id);
            if (model == null)
            {
                throw new ArgumentNullException("model", "Hata Kodu:F100");
            }
            return model;
        }
        public virtual void Create<T>(T model) where T : class
        {
            if (model == null)
            {
                throw new ArgumentNullException("model", "Hata Kodu:C101");
            }

            db.Set<T>().Add(model);
        }
        //Hata Kodu:C102
        public virtual void Update<T>(T model) where T : class
        {
            if (model == null)
            {
                throw new ArgumentNullException("model", "Hata Kodu:C102");
            }
            db.Entry(model).State = System.Data.Entity.EntityState.Modified;
        }
        //Hata Kodu:C103
        public virtual void Delete<T>(int id) where T : class
        {
            try
            {
                var temp = db.Set<T>().Find(id);
                if (temp == null) throw new ArgumentNullException("model", "Hata Kodu:C103");
                db.Set<T>().Remove(temp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual void Save()
        {
            try
            {
                int foo = db.SaveChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                var msg = dbEx.EntityValidationErrors.Aggregate(string.Empty, (current1, validationErrors) => validationErrors.ValidationErrors.Aggregate(current1, (current, validationError) => current + (Environment.NewLine + string.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage))));
                //throw new Exception(msg, dbEx);
                throw new Exception("Üzgünüz...Bir hata oluştu,lütfen bilgilerinizi tekrar kontrol edin.", dbEx);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new DbUpdateConcurrencyException("Başka bir kullanıcı güncelleme yapmakta,lütfen daha sonra tekrar deneyin", ex.InnerException);
            }
            catch (ObjectDisposedException ex)
            {
                throw new ObjectDisposedException(ex.Message, ex.InnerException);
            }
            catch (NotSupportedException ex)
            {
                throw new NotSupportedException(ex.Message, ex.InnerException);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message, ex.InnerException);
            }
            catch (DbUpdateException ex)
            {
                var builder = new StringBuilder("A DbUpdateException was caught while saving changes. ");
                foreach (var result in ex.Entries)
                {
                    builder.AppendFormat("Type: {0} was part of the problem. ", result.Entity.GetType().Name);
                }
                throw new DbUpdateException(ex.Message, ex.InnerException);
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
                if (disposing)
                    db.Dispose();
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public int RowCount(string tableName, string columnName = null, long? id = null)
        {
            throw new NotImplementedException();
        }
    }
}
