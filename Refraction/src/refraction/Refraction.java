/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package refraction;

/**
 *
 * @author Kit
 */
public class Refraction {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        double surfaceData[] = new double[]{237.7641290737884, 172.74575140626317, 404.5084971874737};
        Vector surfaceNormal = new Vector(surfaceData);

        double incidentData[] = new double[]{1000.0, 1000.0, 1000.0};
        Vector incidentVector = new Vector(incidentData);

        incidentVector = incidentVector.direction();

        double eta[] = new double[]{0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1};
        double ratios[] = new double[]{450.0, 400.0, 350.0, 300.0, 250.0, 200.0, 150.0, 100.0, 50.0};

        System.out.println("START OF NEXT METHOD");

        double positiveSigma = -incidentVector.dot(surfaceNormal) + Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
        double negativeSigma = -incidentVector.dot(surfaceNormal) - Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));

        Vector positiveR = incidentVector.plus(surfaceNormal.times(positiveSigma));
        Vector negativeR = incidentVector.plus(surfaceNormal.times(negativeSigma));

        System.out.println(positiveR.toString());
        System.out.println(negativeR.toString());

        incidentVector = positiveR;

        for (int i = 0; i < eta.length - 1; i++) {
            System.out.println(eta[i] + "/" + eta[i + 1]);
            double etaTemp = eta[i] / eta[i + 1];

            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));

            System.out.println(k);

            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));

            System.out.println(R.toString());

            incidentVector = R;

            Vector refractVector = R.direction();

            double iData[] = refractVector.getData();
            double nData[] = surfaceNormal.getData();
            double cData[] = new double[]{0.0, 0.0, 0.0};
            double radius = ratios[i];

            System.out.println(refractVector.toString());
            System.out.println(surfaceNormal.toString());

            double A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
            double C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
            double B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);

            double positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
            double negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);

            System.out.println(positiveT);
            System.out.println(negativeT);

            double x = 0.0;

            double y = 0.0;

            double z = 0.0;

            if ((negativeT < 1) && (negativeT > 0)) {
                x = (nData[0] * (1 - negativeT)) + (negativeT * iData[0]);
                y = (nData[1] * (1 - negativeT)) + (negativeT * iData[1]);
                z = (nData[2] * (1 - negativeT)) + (negativeT * iData[2]);
            } else if ((positiveT < 1) && (positiveT > 0)) {
                x = (nData[0] * (1 - positiveT)) + (positiveT * iData[0]);
                y = (nData[1] * (1 - positiveT)) + (positiveT * iData[1]);
                z = (nData[2] * (1 - positiveT)) + (positiveT * iData[2]);
            }

            surfaceNormal = new Vector(new double[]{x, y, z});

            System.out.println(surfaceNormal.toString());
        }

        System.out.println("BREAK");

        for (int i = 8; i > 0; i--) {
            System.out.println(eta[i] + "/" + eta[i - 1]);
            double etaTemp = eta[i] / eta[i - 1];

            double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));

            Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));

            incidentVector = R;

            Vector refractVector = R.direction();

            double iData[] = refractVector.getData();
            double nData[] = surfaceNormal.getData();
            double cData[] = new double[]{0.0, 0.0, 0.0};
            double radius = ratios[i];

            System.out.println(refractVector.toString());
            System.out.println(surfaceNormal.toString());

            double A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
            double C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
            double B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);

            double positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
            double negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);

            System.out.println(positiveT);
            System.out.println(negativeT);

            double x = 0.0;

            double y = 0.0;

            double z = 0.0;

            if ((negativeT < 1) && (negativeT > 0)) {
                x = (nData[0] * (1 - negativeT)) + (negativeT * iData[0]);
                y = (nData[1] * (1 - negativeT)) + (negativeT * iData[1]);
                z = (nData[2] * (1 - negativeT)) + (negativeT * iData[2]);
            } else if ((positiveT < 1) && (positiveT > 0)) {
                x = (nData[0] * (1 - positiveT)) + (positiveT * iData[0]);
                y = (nData[1] * (1 - positiveT)) + (positiveT * iData[1]);
                z = (nData[2] * (1 - positiveT)) + (positiveT * iData[2]);
            }

            surfaceNormal = new Vector(new double[]{x, y, z});

            System.out.println(surfaceNormal.toString());
        }

        double negativeSigma2 = -incidentVector.dot(surfaceNormal) - Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
        Vector negativeR2 = incidentVector.plus(surfaceNormal.times(negativeSigma2));

        System.out.println(negativeR2);
        /*     
         double surfaceData3[] = new double[]{237.7641290737884, 172.74575140626317, 404.5084971874737};
         surfaceNormal = new Vector(surfaceData3);
        
         double incidentData3[] = new double[]{1000.0, 1000.0, 1000.0};
         incidentVector = new Vector(incidentData3);
        
         incidentVector = incidentVector.direction();
        
         double positiveSigma2 = -incidentVector.dot(surfaceNormal) + Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
         Vector positiveR2 = incidentVector.plus(surfaceNormal.times(positiveSigma2));
         
         incidentVector = positiveR2;
         Vector refractVector = positiveR2.direction();
        
         double iData[] = refractVector.getData();
         double nData[] = surfaceNormal.getData();
         double cData[] = new double[]{0.0, 0.0, 0.0};
         double radius = 450.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         double A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         double C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         double B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         double positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         double negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
         double x;
         x = 0.0;
        
         double y;
         y = 0.0;
        
         double z;
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
        
         double etaTemp = 0.9/0.8;
            
         double k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         Vector R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 400.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.8/0.7;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 350.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.7/0.6;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 300.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.6/0.5;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 250.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.5/0.4;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 200.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.4/0.3;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 150.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.3/0.2;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 100.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.2/0.1;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 50.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.1/0.2;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 100.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.2/0.3;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 150.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.3/0.4;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 200.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.4/0.5;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 250.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.5/0.6;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 300.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.6/0.7;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 350.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.7/0.8;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 400.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         etaTemp = 0.8/0.9;
            
         k = 1.0 - etaTemp * etaTemp * (1.0 - surfaceNormal.dot(incidentVector) * surfaceNormal.dot(incidentVector));
            
         R = (incidentVector.times(etaTemp)).minus(surfaceNormal.times(etaTemp * surfaceNormal.dot(incidentVector) + Math.sqrt(k)));
            
         incidentVector = R;
         refractVector = R.direction();
        
         iData = refractVector.getData();
         nData = surfaceNormal.getData();
         cData = new double[]{0.0, 0.0, 0.0};
         radius = 450.0;
        
         System.out.println(refractVector.toString());
         System.out.println(surfaceNormal.toString());
         
         A = Math.pow((nData[0] - cData[0]), 2.0) + Math.pow((nData[1] - cData[1]), 2.0) + Math.pow((nData[2] - cData[2]), 2.0) + Math.pow(450.0, 2.0);
         C = Math.pow((nData[0] - iData[0]), 2.0) + Math.pow((nData[1] - iData[1]), 2.0) + Math.pow((nData[2] - iData[2]), 2.0);
         B = Math.pow((iData[0] - cData[0]), 2.0) + Math.pow((iData[1] - cData[1]), 2.0) + Math.pow((iData[2] - cData[2]), 2.0) - A - C - Math.pow(450.0, 2.0);
        
         positiveT = (-B + Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
         negativeT = (-B - Math.sqrt(Math.pow(B, 2.0) - (4 * A * C))) / (2 * A);
        
         System.out.println(positiveT);
         System.out.println(negativeT);
        
         x = 0.0;
        
         y = 0.0;
        
         z = 0.0;
        
         if((negativeT < 1) && (negativeT > 0)){
         x = (nData[0] * (1-negativeT)) + (negativeT * iData[0]);
         y = (nData[1] * (1-negativeT)) + (negativeT * iData[1]);
         z = (nData[2] * (1-negativeT)) + (negativeT * iData[2]);
         }
         else if((positiveT < 1) && (positiveT > 0)){
         x = (nData[0] * (1-positiveT)) + (positiveT * iData[0]);
         y = (nData[1] * (1-positiveT)) + (positiveT * iData[1]);
         z = (nData[2] * (1-positiveT)) + (positiveT * iData[2]);
         }
        
         surfaceNormal = new Vector(new double[]{x, y, z});
        
         System.out.println(surfaceNormal.toString());
         
         double negativeSigma2 = -incidentVector.dot(surfaceNormal) - Math.sqrt(Math.pow(incidentVector.dot(surfaceNormal), 2.0) + (1 - incidentVector.dot(incidentVector)));
         Vector negativeR2 = incidentVector.plus(surfaceNormal.times(positiveSigma2));
         
         incidentVector = negativeR2;
         System.out.println(incidentVector.toString());*/
    }

}
