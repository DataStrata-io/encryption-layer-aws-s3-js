var DataStrata = require('@datastrata/aws-s3-encryption-layer');
var fs = require('fs');

const main = async () => {
    try {
        const testBucketName = 'YOUR-BUCKET-NAME';
        const testKey = 'test-file-encrypted-js.txt';
        const testFileName = 'test-file.txt';

        var fileStream = fs.createReadStream(testFileName);
        fileStream.on('error', function(err) {
            console.log('File Error', err);
        });

        const encryptionLayer = new DataStrata.EncryptionLayer(
            'YOUR-REST-CREDENTIAL-CLIENT-ID',
            'YOUR-REST-CREDENTIAL-SECRET',
            'us-east-1');

        const uploadResult = await encryptionLayer.putObject(    {
            Bucket: testBucketName,
            Key: testKey,
            Body: fileStream
        });

        console.log('Object uploaded');

        const downloadResult = await encryptionLayer.getObject(    {
            Bucket: testBucketName,
            Key: testKey
        });

        console.log('Object downloaded');
        console.log(downloadResult.Body.toString());

        const deleteResult = await encryptionLayer.deleteObject(    {
            Bucket: testBucketName,
            Key: testKey
        });

        console.log('Object deleted');
    } catch (e) {
        console.log(e);
    }
}

main();
