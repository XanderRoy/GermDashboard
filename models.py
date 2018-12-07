from .app import db


class metadata(db.Model):
    __tablename__ = 'sample_metadata'

    sample = db.Column(db.Integer, primary_key=True)
    EVENT = db.Column(db.String(64))
    ETHNICITY = db.Column(db.String(64))
    GENDER = db.Column(db.String(64))
    AGE = db.Column(db.Real)
    WFREQ = db.Colum(db.Real)
    BBTYPE = db.Column(db.String(64))
    LOCATION = db.Column(db.String(64))
    COUNTRY012 = db.Column(db.String(64))
    
    def __repr__(self):
        return '<Sample %r>' % (self.sample)

class sampledata(db.Model):
    __tablename__ = 'sample_data'
    
    otu_id = db.Column(db.Integer, primary_key=True)
    otu_label = db.Column(db.string(64))
    940 = db.Column(db.Integer)
    941  = db.Column(db.Integer)
    943  = db.Column(db.Integer)
    944  = db.Column(db.Integer)
    945  = db.Column(db.Integer)
    946 = db.Column(db.Integer)
    947 = db.Column(db.Integer)
    948 = db.Column(db.Integer)
    950 = db.Column(db.Integer)
    952 = db.Column(db.Integer)
    953 = db.Column(db.Integer)
    954  = db.Column(db.Integer)
    955 = db.Column(db.Integer)
    956 = db.Column(db.Integer)
    958 = db.Column(db.Integer)
    959 = db.Column(db.Integer)
    960 = db.Column(db.Integer)
    961  = db.Column(db.Integer)
    962 = db.Column(db.Integer)
    963 = db.Column(db.Integer)
    964 = db.Column(db.Integer)
    966  = db.Column(db.Integer)
    
    def __repr__(self):
        return '<Sample %r>' % (self.sample)
